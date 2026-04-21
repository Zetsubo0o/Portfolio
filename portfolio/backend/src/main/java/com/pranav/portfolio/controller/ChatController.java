package com.pranav.portfolio.controller;

import com.pranav.portfolio.dto.ChatRequest;
import com.pranav.portfolio.dto.ChatResponse;
import com.pranav.portfolio.service.ChatService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    @Autowired
    private ChatService chatService;

    // Rate limiter: IP -> list of request timestamps
    // More generous than contact form: 30 messages per hour
    private static final int CHAT_RATE_LIMIT = 30;
    private static final long CHAT_RATE_WINDOW = 3600000; // 1 hour
    private final Map<String, LinkedList<Long>> chatRateLimitMap = new ConcurrentHashMap<>();

    /**
     * AI Chat endpoint
     * POST /api/chat
     * Accepts: JSON body with message and optional history array
     * Returns: AI-generated reply
     */
    @PostMapping("/chat")
    public ResponseEntity<?> chat(
            @Valid @RequestBody ChatRequest request,
            @RequestHeader(value = "X-Forwarded-For", required = false) String xForwardedFor,
            @RequestHeader(value = "X-Real-IP", required = false) String xRealIp
    ) {
        try {
            String clientIp = getClientIp(xForwardedFor, xRealIp);

            // Rate limit check
            if (!isChatRateLimitAllowed(clientIp)) {
                logger.warn("Chat rate limit exceeded for IP: {}", clientIp);
                return ResponseEntity
                        .status(HttpStatus.TOO_MANY_REQUESTS)
                        .body(new ChatResponse(
                            "You've been chatting a lot! Feel free to reach Pranav directly at kpranav715@gmail.com or book a call on the Contact page.",
                            true
                        ));
            }

            logger.info("Chat request from IP: {} - Message length: {}", clientIp, request.getMessage().length());

            ChatResponse response = chatService.chat(request);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error processing chat request", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ChatResponse(
                        "Something went wrong on my end. You can reach Pranav at kpranav715@gmail.com — he typically replies within 24 hours!",
                        true
                    ));
        }
    }

    private String getClientIp(String xForwardedFor, String xRealIp) {
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        return "unknown";
    }

    private synchronized boolean isChatRateLimitAllowed(String clientIp) {
        long currentTime = System.currentTimeMillis();
        LinkedList<Long> timestamps = chatRateLimitMap.computeIfAbsent(clientIp, k -> new LinkedList<>());

        while (!timestamps.isEmpty() && timestamps.peekFirst() < currentTime - CHAT_RATE_WINDOW) {
            timestamps.removeFirst();
        }

        if (timestamps.size() >= CHAT_RATE_LIMIT) {
            return false;
        }

        timestamps.addLast(currentTime);
        return true;
    }
}
