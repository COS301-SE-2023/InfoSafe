package com.fragile.infosafe.config;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(
        basePackages = "com.fragile.infosafe",
        entityManagerFactoryRef = "secondEntityManagerFactory",
        transactionManagerRef = "secondTransactionManager"
)
public class SecondDataSource {

    @Bean(name = "secondDataSource")
    @ConfigurationProperties(prefix = "second.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name = "secondEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            EntityManagerFactoryBuilder builder,
            @Qualifier("secondDataSource") DataSource dataSource,
            HibernateProperties hibernateProperties
    ) {
        return builder
                .dataSource(dataSource)
                .packages("com.fragile.infosafe")
                .persistenceUnit("second")
                .properties(hibernateProperties.determineHibernateProperties())
                .build();
    }

    @Bean(name = "secondTransactionManager")
    public PlatformTransactionManager transactionManager(
            @Qualifier("secondEntityManagerFactory") EntityManagerFactory entityManagerFactory
    ) {
        return new JpaTransactionManager((jakarta.persistence.EntityManagerFactory) entityManagerFactory);
    }
}
