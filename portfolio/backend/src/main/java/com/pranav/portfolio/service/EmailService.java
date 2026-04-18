package com.pranav.portfolio.service;

import com.pranav.portfolio.dto.ContactRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    private static final String RECIPIENT_EMAIL = "kpranav715@gmail.com";

    public void sendContactEmails(ContactRequest request) {
        try {
            // Email 1: Notification to Pranav
            sendNotificationEmail(request);

            // Email 2: Auto-reply to sender
            sendAutoReplyEmail(request);

            logger.info("Emails sent successfully for contact from: {}", request.getEmail());
        } catch (Exception e) {
            logger.error("Error sending emails", e);
            throw new RuntimeException("Failed to send emails", e);
        }
    }

    private void sendNotificationEmail(ContactRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(RECIPIENT_EMAIL);
        message.setSubject("New Portfolio Contact: " + request.getSubject());
        message.setText(buildNotificationBody(request));

        mailSender.send(message);
    }

    private void sendAutoReplyEmail(ContactRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(request.getEmail());
        message.setSubject("Thank you for reaching out - " + request.getSubject());
        message.setText(buildAutoReplyBody(request));

        mailSender.send(message);
    }

    private String buildNotificationBody(ContactRequest request) {
        StringBuilder body = new StringBuilder();
        body.append("New contact message received from your portfolio website.\n\n");
        body.append("From: ").append(request.getName()).append("\n");
        body.append("Email: ").append(request.getEmail()).append("\n");

        if (request.getCountry() != null && !request.getCountry().isBlank()) {
            body.append("Country: ").append(request.getCountry()).append("\n");
        }
        if (request.getPhone() != null && !request.getPhone().isBlank()) {
            body.append("Phone: ").append(request.getPhone()).append("\n");
        }
        if (request.getBudget() != null && !request.getBudget().isBlank()) {
            body.append("Budget: ").append(request.getBudget()).append("\n");
        }

        body.append("Subject: ").append(request.getSubject()).append("\n\n");
        body.append("Message:\n").append(request.getMessage()).append("\n\n");
        body.append("---\n");
        body.append("Reply directly to this email to get back to the sender.");
        return body.toString();
    }

    private String buildAutoReplyBody(ContactRequest request) {
        return String.format(
            "Hi %s,\n\n" +
            "Thank you for reaching out! I've received your message regarding \"%s\".\n\n" +
            "I appreciate your interest and will review your inquiry carefully. " +
            "I typically respond within 24 hours.\n\n" +
            "In the meantime, feel free to check out my portfolio at https://pranav-kumar.dev\n\n" +
            "Best regards,\n" +
            "Pranav Kumar\n" +
            "Full-Stack Developer & Freelance Consultant\n\n" +
            "Connect with me:\n" +
            "GitHub: https://github.com/Zetsubo0o\n" +
            "LinkedIn: https://linkedin.com/in/pranav-kumar15\n" +
            "Email: kpranav715@gmail.com",
            request.getName(),
            request.getSubject()
        );
    }
}
