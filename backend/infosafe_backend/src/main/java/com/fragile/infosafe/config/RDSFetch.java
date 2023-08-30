package com.fragile.infosafe.config;

import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.services.secretsmanager.AWSSecretsManager;
import com.amazonaws.services.secretsmanager.AWSSecretsManagerClientBuilder;
import com.amazonaws.services.secretsmanager.model.GetSecretValueResult;
import com.google.gson.Gson;
import lombok.Getter;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.iam.model.CreateAccessKeyRequest;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;
import software.amazon.awssdk.services.securitylake.model.AwsIdentity;

import javax.sql.DataSource;

@Configuration
public class RDSFetch {

    private Gson gson = new Gson();

    @Bean
    public DataSource datasource() {

        RDSLogin login = getRDSLogin();

        return DataSourceBuilder
                .create()
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .url("jdbc:" + login.getEngine() + "://" + login.getHost() + ":" + login.getPort() + "/" + login.getDbname())
                .username(login.getUsername())
                .password(login.getPassword())
                .build();
    }

    private RDSLogin getRDSLogin() {

        String secretName = "rds_login";
        String region = "us-east-1";

        // Create a Secrets Manager client
        SecretsManagerClient client = SecretsManagerClient.builder()
                .region(Region.of(region))
                .credentialsProvider(new AwsCredentialsProvider() {
                    @Override
                    public AwsCredentials resolveCredentials() {
                        AwsCredentials awsCredentials = new AwsCredentials() {
                            @Override
                            public String accessKeyId() {
                                return System.getenv("AWS_ACCESS_KEY_ID");
                            }

                            @Override
                            public String secretAccessKey() {
                                return System.getenv("AWS_SECRET_ACCESS_KEY");
                            }
                        };

                        return awsCredentials;
                    }
                })
                .build();

        GetSecretValueRequest getSecretValueRequest = GetSecretValueRequest.builder()
                .secretId(secretName)
                .build();

        GetSecretValueResponse getSecretValueResponse;

        try {
            getSecretValueResponse = client.getSecretValue(getSecretValueRequest);
        } catch (Exception e) {
            throw e;
        }

        String secret = getSecretValueResponse.secretString();
        return gson.fromJson(secret, RDSLogin.class);
    }
}
