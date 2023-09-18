package com.fragile.infosafe.primary.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Objects;

@Configuration
@RequiredArgsConstructor
// @PropertySource({ "classpath:application.properties" })
@EnableJpaRepositories(
        basePackages = {"com.fragile.infosafe.delete"},
        entityManagerFactoryRef = "secondaryEntityManager",
        transactionManagerRef = "secondaryTransactionManager"
)
public class PersistenceSecondaryConfiguration {
    private final Environment env;
    @Bean
    public LocalContainerEntityManagerFactoryBean secondaryEntityManager() {
        final LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(secondaryDataSource());
        em.setPackagesToScan("com.fragile.infosafe.delete");

        final HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        final HashMap<String, Object> properties = new HashMap<String, Object>();
        properties.put("hibernate.hbm2ddl.auto", "update");
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        em.setJpaPropertyMap(properties);

        return em;
    }
    @Bean
    @ConfigurationProperties(prefix="spring.datasource.second") // this stimulates the database
    public DataSource secondaryDataSource() {
        return DataSourceBuilder.create().build();
    }


    @Bean
    public PlatformTransactionManager secondaryTransactionManager() {
        final JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(secondaryEntityManager().getObject());
        return transactionManager;
    }
}

