import React, {useState} from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CreateDevicePopup from "../../Create/CreateDevicePopup.js";

describe("CreateDevice Component", () => {
    it("renders correctly with device data", () => {
        const { getByText } = render(
            <CreateDevicePopup popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Add Device")).toBeInTheDocument();
        expect(screen.getByText("Device Name")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        expect(screen.getByText("Device Type")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        expect(screen.getByText("Device Description")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        expect(screen.getByText("Condition")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Availability")).toBeInTheDocument();
        //expect(screen.getByText("Current Custodian")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <CreateDevicePopup popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });

    // it("calls popupClose when submit button is clicked", () => {
    //     const popupCloseMock = jest.fn();
    //
    //     const { getByTestId } = render(
    //         <CreateDevicePopup popupOpen={true} popupClose={popupCloseMock} />
    //     );
    //
    //     // eslint-disable-next-line testing-library/prefer-screen-queries
    //     const submitButton = getByTestId("submit-button"); // Select the button by test ID
    //     fireEvent.click(submitButton);
    //
    //     // Ensure that popupClose was called when the back button is clicked
    //     expect(popupCloseMock).toHaveBeenCalled();
    // });
});
