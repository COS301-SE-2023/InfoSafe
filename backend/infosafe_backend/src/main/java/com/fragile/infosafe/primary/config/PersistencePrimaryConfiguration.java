package com.fragile.infosafe.primary.config;

import com.fragile.infosafe.primary.service.AWSSecretService;
import com.zaxxer.hikari.HikariDataSource;
import jakarta.annotation.PreDestroy;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import javax.sql.DataSource;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
@EnableJpaRepositories(
        basePackages = {"com.fragile.infosafe.primary"},
        entityManagerFactoryRef = "primaryEntityManager",
        transactionManagerRef = "primaryTransactionManager"
)
public class PersistencePrimaryConfiguration {
    private final AWSSecretService awsSecretService;

    @Primary
    @PreDestroy
    @Bean
    public LocalContainerEntityManagerFactoryBean primaryEntityManager() {
        final LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(primaryDataSource());
        em.setPackagesToScan("com.fragile.infosafe.primary");
        final HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        vendorAdapter.setShowSql(true);
        final HashMap<String, Object> properties = new HashMap<String, Object>();
        properties.put("hibernate.hbm2ddl.auto", "update");
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        em.setJpaPropertyMap(properties);

        return em;
    }

    @Primary
    @PreDestroy
    @Bean
    public DataSource primaryDataSource () {
        RDSLogin login = awsSecretService.getRDSLogin();
        DataSource dataSource = DataSourceBuilder
                .create()
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .url("jdbc:" + login.getEngine() + "://" + login.getHost() + ":" + login.getPort() + "/" + login.getDbname())
                .username(login.getUsername())
                .password(login.getPassword())
                .build();

        if (dataSource instanceof HikariDataSource hikariDataSource) {
            hikariDataSource.setMaximumPoolSize(10);
            hikariDataSource.setIdleTimeout(60000 * 5);
        }
        return dataSource;
    }


    @Primary
    @PreDestroy
    @Bean
    public PlatformTransactionManager primaryTransactionManager () {
        final JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(primaryEntityManager().getObject());
        return transactionManager;
    }
}