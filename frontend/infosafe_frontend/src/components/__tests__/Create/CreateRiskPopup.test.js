import React, {useState} from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CreateRiskPopup from "../../Create/CreateRiskPopup.js";

describe("CreateRisk Component", () => {
    it("renders correctly with risk data", () => {
        const { getByText } = render(
            <CreateRiskPopup popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Create Risk")).toBeInTheDocument();
        expect(screen.getByText("Risk Name")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        expect(screen.getByText("Probability")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        expect(screen.getByText("Impact")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        expect(screen.getByText("Risk Description")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        //expect(screen.getByText("Risk Status")).toBeInTheDocument();
        expect(screen.getByText("Suggested Mitigation")).toBeInTheDocument();
        expect(screen.getByText("Data Scope")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <CreateRiskPopup popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
