package com.fragile.infosafe.tests;
// Generated by CodiumAI

import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.Risk;
import org.junit.Test;
import static org.junit.Assert.*;

public class RiskTest {


    // Create a new Risk object with all fields populated
    @Test
    public void test_createRiskObjectWithAllFieldsPopulated() {
        Risk risk = Risk.builder()
                .risk_id(1)
                .risk_name("Test Risk")
                .impact_rating("High")
                .probability_rating("Low")
                .risk_description("Test Risk Description")
                .suggested_mitigation("Test Mitigation")
                .risk_status("Open")
                .dataScope(new DataScope())
                .build();

        assertEquals(1, risk.getRisk_id());
        assertEquals("Test Risk", risk.getRisk_name());
        assertEquals("High", risk.getImpact_rating());
        assertEquals("Low", risk.getProbability_rating());
        assertEquals("Test Risk Description", risk.getRisk_description());
        assertEquals("Test Mitigation", risk.getSuggested_mitigation());
        assertEquals("Open", risk.getRisk_status());
        assertNotNull(risk.getDataScope());
    }

    // Set and get all fields of a Risk object
    @Test
    public void test_setAndGetAllFields() {
        Risk risk = new Risk();

        risk.setRisk_id(1);
        risk.setRisk_name("Test Risk");
        risk.setImpact_rating("High");
        risk.setProbability_rating("Low");
        risk.setRisk_description("Test Risk Description");
        risk.setSuggested_mitigation("Test Mitigation");
        risk.setRisk_status("Open");
        risk.setDataScope(new DataScope());

        assertEquals(1, risk.getRisk_id());
        assertEquals("Test Risk", risk.getRisk_name());
        assertEquals("High", risk.getImpact_rating());
        assertEquals("Low", risk.getProbability_rating());
        assertEquals("Test Risk Description", risk.getRisk_description());
        assertEquals("Test Mitigation", risk.getSuggested_mitigation());
        assertEquals("Open", risk.getRisk_status());
        assertNotNull(risk.getDataScope());
    }

    // Set and get a DataScope object for a Risk object
    @Test
    public void test_setAndGetDatascope() {
        Risk risk = new Risk();
        DataScope dataScope = new DataScope();

        risk.setDataScope(dataScope);

        assertEquals(dataScope, risk.getDataScope());
    }

    // Create a new Risk object with empty strings for all fields
    @Test
    public void test_createRiskObjectWithEmptyStrings() {
        Risk risk = Risk.builder()
                .risk_id(1)
                .risk_name("")
                .impact_rating("")
                .probability_rating("")
                .risk_description("")
                .suggested_mitigation("")
                .risk_status("")
                .dataScope(new DataScope())
                .build();

        assertEquals(1, risk.getRisk_id());
        assertEquals("", risk.getRisk_name());
        assertEquals("", risk.getImpact_rating());
        assertEquals("", risk.getProbability_rating());
        assertEquals("", risk.getRisk_description());
        assertEquals("", risk.getSuggested_mitigation());
        assertEquals("", risk.getRisk_status());
        assertNotNull(risk.getDataScope());
    }

    // Create a new Risk object with null values for all fields
    @Test
    public void test_createRiskObjectWithNullValues() {
        Risk risk = Risk.builder()
                .risk_id(1)
                .risk_name(null)
                .impact_rating(null)
                .probability_rating(null)
                .risk_description(null)
                .suggested_mitigation(null)
                .risk_status(null)
                .dataScope(null)
                .build();

        assertEquals(1, risk.getRisk_id());
        assertNull(risk.getRisk_name());
        assertNull(risk.getImpact_rating());
        assertNull(risk.getProbability_rating());
        assertNull(risk.getRisk_description());
        assertNull(risk.getSuggested_mitigation());
        assertNull(risk.getRisk_status());
        assertNull(risk.getDataScope());
    }

    // Create a new Risk object with a very long string for one of the fields
    @Test
    public void test_createRiskObjectWithVeryLongString() {
        String longString = "This is a very long string that exceeds the maximum length allowed for the field";

        Risk risk = Risk.builder()
                .risk_id(1)
                .risk_name(longString)
                .impact_rating("High")
                .probability_rating("Low")
                .risk_description("Test Risk Description")
                .suggested_mitigation("Test Mitigation")
                .risk_status("Open")
                .dataScope(new DataScope())
                .build();

        assertEquals(1, risk.getRisk_id());
        assertEquals(longString, risk.getRisk_name());
        assertEquals("High", risk.getImpact_rating());
        assertEquals("Low", risk.getProbability_rating());
        assertEquals("Test Risk Description", risk.getRisk_description());
        assertEquals("Test Mitigation", risk.getSuggested_mitigation());
        assertEquals("Open", risk.getRisk_status());
        assertNotNull(risk.getDataScope());
    }

}