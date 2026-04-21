package com.pranav.portfolio.dto;

public class ChatResponse {

    private String reply;
    private boolean error;

    public ChatResponse() {}

    public ChatResponse(String reply) {
        this.reply = reply;
        this.error = false;
    }

    public ChatResponse(String reply, boolean error) {
        this.reply = reply;
        this.error = error;
    }

    public String getReply() { return reply; }
    public void setReply(String reply) { this.reply = reply; }
    public boolean isError() { return error; }
    public void setError(boolean error) { this.error = error; }
}
