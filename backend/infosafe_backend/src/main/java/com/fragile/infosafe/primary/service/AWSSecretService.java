package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.config.RDSLogin;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;
import com.google.gson.Gson;

@Service
@RequiredArgsConstructor
public class AWSSecretService {
    private final String secretName = "rds_login";
    private final String region = "us-east-1";

    @Value("${AWS_ACCESS_KEY_ID}")
    private String awsAccessKeyId;

    @Value("${AWS_SECRET_ACCESS_KEY}")
    private String awsSecretAccessKey;

    private final Gson gson = new Gson();

    public RDSLogin getRDSLogin() {
        SecretsManagerClient client = SecretsManagerClient.builder()
                .region(Region.of(region))
                .credentialsProvider(createCredentialsProvider())
                .build();

        GetSecretValueRequest getSecretValueRequest = GetSecretValueRequest.builder()
                .secretId(secretName)
                .build();

        GetSecretValueResponse getSecretValueResponse = client.getSecretValue(getSecretValueRequest);

        String secret = getSecretValueResponse.secretString();
        return gson.fromJson(secret, RDSLogin.class);
    }

    private AwsCredentialsProvider createCredentialsProvider() {
        return new AwsCredentialsProvider() {
            @Override
            public AwsCredentials resolveCredentials() {
                AwsCredentials awsCredentials = new AwsCredentials() {
                    @Override
                    public String accessKeyId() {
                        return awsAccessKeyId;
                    }

                    @Override
                    public String secretAccessKey() {
                        return awsSecretAccessKey;
                    }
                };

                return awsCredentials;
            }
        };
    }
}
