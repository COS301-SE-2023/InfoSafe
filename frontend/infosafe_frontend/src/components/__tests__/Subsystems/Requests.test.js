import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Requests from "../../Subsystems/Requests"; // Import your component here

describe("Requests Component", () => {

    it("renders correctly with user data", () => {
        const { getByText } = render(
            <Requests />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Support Type")).toBeInTheDocument();
        expect(screen.getByText("Data Scope")).toBeInTheDocument();
        //expect(screen.getByText("Tasks")).toBeInTheDocument();
        //expect(screen.getByText("Devices")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Data Scope")).toBeInTheDocument();
        //expect(screen.getByText("Reason")).toBeInTheDocument();
        //expect(screen.getByText("Device")).toBeInTheDocument();
        //expect(screen.getByText("Desired Date")).toBeInTheDocument();

    });

    // it("calls popupClose when back button is clicked", () => {
    //     const popupCloseMock = jest.fn();
    //
    //     const { getByTestId } = render(
    //         <EditUser user={user} popupOpen={true} popupClose={popupCloseMock} />
    //     );
    //
    //     // eslint-disable-next-line testing-library/prefer-screen-queries
    //     const backButton = getByTestId("back-button"); // Select the button by test ID
    //     fireEvent.click(backButton);
    //
    //     // Ensure that popupClose was called when the back button is clicked
    //     expect(popupCloseMock).toHaveBeenCalled();
    // });
});
