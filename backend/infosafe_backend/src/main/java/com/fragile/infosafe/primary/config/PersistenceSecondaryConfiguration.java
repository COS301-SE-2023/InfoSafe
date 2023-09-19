package com.fragile.infosafe.primary.config;

import com.google.gson.Gson;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import software.amazon.awssdk.auth.credentials.AwsCredentials;
import software.amazon.awssdk.auth.credentials.AwsCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.secretsmanager.SecretsManagerClient;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueRequest;
import software.amazon.awssdk.services.secretsmanager.model.GetSecretValueResponse;
import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
@EnableJpaRepositories(
        basePackages = {"com.fragile.infosafe.delete"},
        entityManagerFactoryRef = "secondaryEntityManager",
        transactionManagerRef = "secondaryTransactionManager"
)
public class PersistenceSecondaryConfiguration {

    private Gson gson = new Gson();

    @Bean
    public LocalContainerEntityManagerFactoryBean secondaryEntityManager() {
        final LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(secondaryDataSource());
        em.setPackagesToScan("com.fragile.infosafe.delete");

        final HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        vendorAdapter.setShowSql(true);
        final HashMap<String, Object> properties = new HashMap<String, Object>();
        properties.put("hibernate.hbm2ddl.auto", "update");
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        em.setJpaPropertyMap(properties);

        return em;
    }

    @Bean
    public DataSource secondaryDataSource() {
        DeleteDBLogin login = getDeleteDBLogin();
        return DataSourceBuilder
                .create()
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .url("jdbc:" + login.getEngine() + "://" + login.getHost() + ":" + login.getPort() + "/secondary_database") //+ login.getDbname())
                .username(login.getUsername())
                .password(login.getPassword())
                .build();
    }

    private DeleteDBLogin getDeleteDBLogin() {

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
        return gson.fromJson(secret, DeleteDBLogin.class);
    }

    @Bean
    public PlatformTransactionManager secondaryTransactionManager() {
        final JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(secondaryEntityManager().getObject());
        return transactionManager;
    }
}
