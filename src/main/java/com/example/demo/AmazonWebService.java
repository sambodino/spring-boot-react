package com.example.demo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerAsyncClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;

import java.io.IOException;
import java.security.CryptoPrimitive;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Component
public class AmazonWebService {
    private final static String SPOTIFY_SECRET_NAME = "sambodino/Api/Spotify";
    private final static String CACHE_KEY = "secrets";
    private final static long ONE_DAY = 1000 * 60 * 60 * 24;

    private final ObjectMapper objectMapper;
    private final SecretsManagerAsyncClient client;
    private volatile Map<String, SpotifySecrets> cache;

    public AmazonWebService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
        this.client = SecretsManagerAsyncClient.builder()
                .region(Region.US_EAST_1)
                .build();

        updateCache();
    }

    @Scheduled(fixedRate = ONE_DAY)
    private void updateCache() {
        Map<String, SpotifySecrets> newCache = Collections.synchronizedMap(new HashMap<>());

        try {
            SpotifySecrets secrets = getSecretFromAWS();
            newCache.put(CACHE_KEY, secrets);
        } catch (InterruptedException | IOException | ExecutionException e) {
            e.printStackTrace();
        } finally {
            cache = newCache;
        }
    }

    public SpotifySecrets getSecret() {
        return cache.get(CACHE_KEY);
    }

    private SpotifySecrets getSecretFromAWS() throws ExecutionException, InterruptedException, IOException {
        GetSecretValueRequest getSecretValueRequest = GetSecretValueRequest.builder()
                .secretId(SPOTIFY_SECRET_NAME)
                .build();

        CompletableFuture<String> secretString = client.getSecretValue(getSecretValueRequest)
                .thenApply(GetSecretValueResponse::secretString);

        return objectMapper.readValue(secretString.get(), SpotifySecrets.class);
    }
}
