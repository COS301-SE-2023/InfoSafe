import React, {useState} from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AccessRequestApproval from "../../Reviews/AccessRequestApproval.js";

describe("AccessRequestApproval Component", () => {
    const access = {
        ds_id: "1",
        reason: "User moved to new Datascope",
        status: "Pending",
        data_scope_id: {
            ds_name: "datascope 1"
        },
        user_id: {
            first_name: "John",
            last_name: "Doe"
        }
    };

    it("renders correctly with approval data", () => {
        const { getByText } = render(
            <AccessRequestApproval access={access} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Access Request Approval")).toBeInTheDocument();
        expect(screen.getByText("Data Scope")).toBeInTheDocument();
        expect(screen.getByText("datascope 1")).toBeInTheDocument();
        expect(screen.getByText("User")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("Reason")).toBeInTheDocument();
        expect(screen.getByText("User moved to new Datascope")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Pending")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <AccessRequestApproval access={access} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
