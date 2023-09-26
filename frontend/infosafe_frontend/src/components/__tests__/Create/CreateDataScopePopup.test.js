import React, {useState} from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CreateDataScopePopup from "../../Create/CreateDataScopePopup.js";

describe("CreateDataScope Component", () => {
    it("renders correctly with user data", () => {
        const { getByText } = render(
            <CreateDataScopePopup popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Create Data Scope")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <CreateDataScopePopup popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
