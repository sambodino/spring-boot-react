package com.example.demo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerAsyncClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Component
public class AmazonWebService {
    private final static String SPOTIFY_SECRET_NAME = "sambodino/Api/Spotify";

    private final ObjectMapper objectMapper;
    private final SecretsManagerAsyncClient client;

    public AmazonWebService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.client = SecretsManagerAsyncClient.builder()
                .region(Region.US_EAST_1)
                .build();
    }

    public SpotifySecrets getSecret() throws ExecutionException, InterruptedException, IOException {
        GetSecretValueRequest getSecretValueRequest = GetSecretValueRequest.builder()
                .secretId(SPOTIFY_SECRET_NAME)
                .build();

        CompletableFuture<String> secretString = client.getSecretValue(getSecretValueRequest)
                .thenApply(GetSecretValueResponse::secretString);

        return objectMapper.readValue(secretString.get(), SpotifySecrets.class);
    }
}
