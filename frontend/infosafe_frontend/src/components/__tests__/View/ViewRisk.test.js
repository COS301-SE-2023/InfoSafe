import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ViewRisk from "../../View/ViewRisk";

describe("ViewRisk Component", () => {
    const risk = {
        risk_id: "1",
        risk_name: "Risk1",
        probability_rating: "3",
        impact_rating: "4",
        risk_description: "Risk for datascope 1",
        dataScope: {
            ds_name: "datascope 1"
        }
    };

    it("renders correctly with risk data", () => {
        const { getByText } = render(
            <ViewRisk risk={risk} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("View Risk")).toBeInTheDocument();
        expect(screen.getByText("Risk Name")).toBeInTheDocument();
        expect(screen.getByText("Risk1")).toBeInTheDocument();
        expect(screen.getByText("Risk ID")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("Data Scope")).toBeInTheDocument();
        expect(screen.getByText("datascope 1")).toBeInTheDocument();
        expect(screen.getByText("Probability")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("Impact")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("Vulnerability/Threat")).toBeInTheDocument();
        expect(screen.getByText("Risk for datascope 1")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <ViewRisk risk={risk} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
