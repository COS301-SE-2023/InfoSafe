import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import EditSupportRequest from "../../Edit/EditSupportRequest";

describe("EditSupportRequest Component", () => {
    const support = {
        support_type: "Software",
        user_id: "3",
        support_description: "Microsoft office support",
        support_status: "Pending"
    };

    it("renders correctly with support request data", () => {
        const { getByText } = render(
            <EditSupportRequest support={support} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Edit Support Request")).toBeInTheDocument();
        expect(screen.getByText("Type of Support Request")).toBeInTheDocument();
        expect(screen.getByText("Software")).toBeInTheDocument();
        expect(screen.getByText("User")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Microsoft office support")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Pending")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <EditSupportRequest support={support} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
