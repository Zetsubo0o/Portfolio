package com.pranav.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public class ChatRequest {

    @NotBlank(message = "Message is required")
    @Size(max = 2000, message = "Message must be under 2000 characters")
    private String message;

    private List<ChatMessage> history;

    // Nested class for conversation history
    public static class ChatMessage {
        private String role; // "user" or "model"
        private String text;

        public ChatMessage() {}

        public ChatMessage(String role, String text) {
            this.role = role;
            this.text = text;
        }

        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public List<ChatMessage> getHistory() { return history; }
    public void setHistory(List<ChatMessage> history) { this.history = history; }
}
