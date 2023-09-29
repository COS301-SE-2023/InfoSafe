import React, {useState} from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ReviewRisk from "../../Reviews/ReviewRiskPopup.js";

describe("ReviewRisk Component", () => {
    const risk = {
        asset_id: "1",
        risk_description: "risk for datascope 1",
        risk_status: "Open",
        dataScope: {
            ds_name: "datascope 1"
        },
        user: {
            first_name: "John",
            last_name: "Doe"
        },
        probability_rating: "high",
        impact_rating: "low"
    };

    it("renders correctly with review data", () => {
        const { getByText } = render(
            <ReviewRisk risk={risk} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Review Risk")).toBeInTheDocument();
        expect(screen.getByText("Data Scope")).toBeInTheDocument();
        expect(screen.getByText("datascope 1")).toBeInTheDocument();
        expect(screen.getByText("Probability")).toBeInTheDocument();
        expect(screen.getByText("high")).toBeInTheDocument();
        expect(screen.getByText("Impact")).toBeInTheDocument();
        expect(screen.getByText("low")).toBeInTheDocument();
        //expect(screen.getByText("Vulnerability/Threat")).toBeInTheDocument();
        //expect(screen.getByText("risk for datascope 1")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Open")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <ReviewRisk risk={risk} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
