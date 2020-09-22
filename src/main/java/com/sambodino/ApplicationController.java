package com.sambodino;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ApplicationController {
    private final RestTemplate restTemplate;
    private final String spotifyApiUrl;
    private final String spotifyAccountsUrl;
    private final String clientKey;
    private final AmazonWebService awsService;

    public ApplicationController(RestTemplate restTemplate,
                                 @Value("${spotify.api.url}") String spotifyApiUrl,
                                 @Value("${spotify.accounts.url}") String spotifyAccountsUrl,
                                 @Value("${spotify.clientKey}") String clientKey,
                                 AmazonWebService awsService) {
        this.restTemplate = restTemplate;
        this.spotifyApiUrl = spotifyApiUrl;
        this.spotifyAccountsUrl = spotifyAccountsUrl;
        this.clientKey = clientKey;
        this.awsService = awsService;
    }

    @GetMapping(value = "/tracks")
    public String getTracks() {
        SpotifySecrets secret = awsService.getSecret();
        String clientSecret = secret.getClientSecret();
        String refreshToken = secret.getRefreshToken();

        var form = new LinkedMultiValueMap<>();
        form.add("grant_type", "refresh_token");
        form.add("refresh_token", refreshToken);

        var headers = new HttpHeaders();
        headers.setBasicAuth(clientKey, clientSecret);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        ResponseEntity<AccessToken> accessTokenResponse = restTemplate
                .exchange(spotifyAccountsUrl + "/api/token", HttpMethod.POST, new HttpEntity<>(form, headers), AccessToken.class);

        headers.setBearerAuth(accessTokenResponse.getBody().getAccessToken());
        headers.setContentType(MediaType.APPLICATION_JSON);

        ResponseEntity<String> recentTracks = getRecentlyPlayedTracks(headers);
        return recentTracks.getBody();
    }

    private ResponseEntity<String> getRecentlyPlayedTracks(HttpHeaders headers) {
        var url = spotifyApiUrl + "/v1/me/player/recently-played?type=track";
        return restTemplate.exchange(url, HttpMethod.GET, new HttpEntity<>(headers), String.class);
    }
}
