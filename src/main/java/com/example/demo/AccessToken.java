package com.example.demo;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Component;

public class AccessToken {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("scope")
    private String scope;

    public String getAccessToken() {
        return accessToken;
    }

    public String getScope() {
        return scope;
    }
}
