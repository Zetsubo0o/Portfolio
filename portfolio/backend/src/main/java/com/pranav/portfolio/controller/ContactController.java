package com.pranav.portfolio.controller;

import com.pranav.portfolio.dto.ContactRequest;
import com.pranav.portfolio.service.EmailService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ContactController {

    private static final Logger logger = LoggerFactory.getLogger(ContactController.class);

    @Autowired
    private EmailService emailService;

    // Simple in-memory rate limiter: IP -> list of request timestamps
    private static final int RATE_LIMIT = 5;
    private static final long RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
    private final Map<String, LinkedList<Long>> rateLimitMap = new ConcurrentHashMap<>();

    /**
     * Health check endpoint for uptime monitoring
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "ok"));
    }

    /**
     * Contact form submission endpoint
     * POST /api/contact
     * Accepts: JSON body with name, email, subject, message
     * Returns: 200 on success, 400 on validation error, 429 on rate limit
     */
    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> submitContact(
        @Valid @RequestBody ContactRequest request,
        @RequestHeader(value = "X-Forwarded-For", required = false) String xForwardedFor,
        @RequestHeader(value = "X-Real-IP", required = false) String xRealIp
    ) {
        try {
            // Get client IP address
            String clientIp = getClientIp(xForwardedFor, xRealIp);

            // Check rate limit
            if (!isRateLimitAllowed(clientIp)) {
                logger.warn("Rate limit exceeded for IP: {}", clientIp);
                return ResponseEntity
                    .status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("error", "Too many requests. Please try again later."));
            }

            // Send emails
            emailService.sendContactEmails(request);

            logger.info("Contact form submitted from IP: {} - Email: {}", clientIp, request.getEmail());

            return ResponseEntity.ok(
                Map.of("message", "Your message has been sent successfully. I'll get back to you within 24 hours.")
            );

        } catch (Exception e) {
            logger.error("Error processing contact form", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to send message. Please try again later."));
        }
    }

    /**
     * Extract client IP address from headers or remote address
     */
    private String getClientIp(String xForwardedFor, String xRealIp) {
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        return "unknown";
    }

    /**
     * Simple sliding window rate limiter
     * Allows up to RATE_LIMIT requests per RATE_LIMIT_WINDOW (1 hour)
     */
    private synchronized boolean isRateLimitAllowed(String clientIp) {
        long currentTime = System.currentTimeMillis();

        LinkedList<Long> timestamps = rateLimitMap.computeIfAbsent(
            clientIp,
            k -> new LinkedList<>()
        );

        // Remove timestamps older than the window
        while (!timestamps.isEmpty() && timestamps.peekFirst() < currentTime - RATE_LIMIT_WINDOW) {
            timestamps.removeFirst();
        }

        // Check if limit exceeded
        if (timestamps.size() >= RATE_LIMIT) {
            return false;
        }

        // Add current timestamp
        timestamps.addLast(currentTime);
        return true;
    }
}
