import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ViewAccessRequest from "../../View/ViewAccessRequest";

describe("ViewAccessRequest Component", () => {
    const access = {
        request_id: '1',
        user_id: '2',
        data_scope_id: '3',
        status: 'Approved',
        reason: 'Reason testing'
    };

    it("renders correctly with access request data", () => {
        const { getByText } = render(
            <ViewAccessRequest access={access} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("View Access Request")).toBeInTheDocument();
        expect(screen.getByText("Data Scope")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("User")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("Reason")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Reason testing")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <ViewAccessRequest access={access} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
