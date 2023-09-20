import React from "react";
import { render, fireEvent} from "@testing-library/react";
import ViewAccessRequest from "../../View/ViewAccessRequest";

describe("ViewAccessRequest Component", () => {
    const request = {
        data_scope: "John",
        role: "Doe",
        reason: "john.doe@example.com",
        status: "User"
    };

    // it("renders correctly with user data", () => {
    //     const { getByText } = render(
    //         <ViewAccessRequest popupOpen={true} popupClose={() => {}} />
    //     );
    //
    //     // Ensure that the component renders with user data
    //     expect(screen.getByText("View Access Request")).toBeInTheDocument();
    //     expect(screen.getByText("Data Scope")).toBeInTheDocument();
    //     expect(screen.getByText("")).toBeInTheDocument();
    //     expect(screen.getByText("Role")).toBeInTheDocument();
    //     expect(screen.getByText("")).toBeInTheDocument();
    //     expect(screen.getByText("Reason")).toBeInTheDocument();
    //     expect(screen.getByText("")).toBeInTheDocument();
    //     expect(screen.getByText("Status")).toBeInTheDocument();
    //     expect(screen.getByText("")).toBeInTheDocument();
    // });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <ViewAccessRequest popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
