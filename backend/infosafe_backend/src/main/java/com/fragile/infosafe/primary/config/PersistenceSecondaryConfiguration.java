package com.fragile.infosafe.primary.config;

import com.fragile.infosafe.primary.service.AWSSecretService;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import javax.sql.DataSource;
import java.util.HashMap;
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

    private final AWSSecretService awsSecretService;

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
//
//    @Bean
//    @ConfigurationProperties(prefix = "spring.datasource.second")
//    public DataSource secondaryDataSource() {
//        return DataSourceBuilder.create().build();
//
//    }
    @Bean
    public DataSource secondaryDataSource() {
        RDSLogin login = awsSecretService.getRDSLogin();
        return DataSourceBuilder
                .create()
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .url("jdbc:" + login.getEngine() + "://" + login.getHost() + ":" + login.getPort() + "/secondary_database") //+ login.getDbname())//"jdbc:" + login.getEngine() + "://" + login.getHost() + ":" + login.getPort() + "/secondary_database") //+ login.getDbname())
                .username(login.getUsername()) //login.getUsername())
                .password(login.getPassword()) //login.getPassword())
                .build();
    }

    @Bean
    public PlatformTransactionManager secondaryTransactionManager() {
        final JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(secondaryEntityManager().getObject());
        return transactionManager;
    }
}
