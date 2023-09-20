package com.fragile.infosafe.primary.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KeyStructure {
    private String type;
    private String value;
}
