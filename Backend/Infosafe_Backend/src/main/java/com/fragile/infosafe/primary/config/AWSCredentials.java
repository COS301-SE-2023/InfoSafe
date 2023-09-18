package com.fragile.infosafe.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AWSCredentials {
        private String accessKey;
        private String secretKey;
}
