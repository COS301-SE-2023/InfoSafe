import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import EditUser from "../../Edit/EditUser"; // Import your component here

describe("EditUser Component", () => {
    const user = {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        role: {
            role_name: "User",
        },
    };

    it("renders correctly with user data", () => {
        const { getByText } = render(
            <EditUser user={user} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Edit User")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByDisplayValue("John")).toBeInTheDocument();
        expect(screen.getByText("Surname")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByDisplayValue("john.doe@example.com")).toBeInTheDocument();
        expect(screen.getByText("System Role")).toBeInTheDocument();
        //expect(screen.getByText("User")).toBeInTheDocument(); Fix this
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <EditUser user={user} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
