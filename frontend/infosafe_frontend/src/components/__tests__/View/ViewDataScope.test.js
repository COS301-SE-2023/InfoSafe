import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ViewDataScope from "../../View/ViewDataScope";

describe("ViewDataScope Component", () => {
    const datascope = {
        ds_name: "Datascope 1",
        ds_description: "Data scope for time management",
        date_captured: "2023-06-06",
        ds_status: "Approved",
        roles: {
            role: "User",
            roledescription: "Regular User"
        },
        data_custodian: {
            first_name: "John",
            last_name: "Doe"
        },
        users: {
            first_name: "Jane",
            last_name: "Deen"
        }
    };

    it("renders correctly with data scope data", () => {
        const { getByText } = render(
            <ViewDataScope datascope={datascope} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("View Data Scope")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Datascope 1")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByText("Data scope for time management")).toBeInTheDocument();
        expect(screen.getByText("Date Captured")).toBeInTheDocument();
        expect(screen.getByText("2023-06-06")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Approved")).toBeInTheDocument();
        expect(screen.getByText("Assigned Users")).toBeInTheDocument();
        //expect(screen.getByText("Jane Deen")).toBeInTheDocument();
        //expect(screen.getByText("Role")).toBeInTheDocument();
        //expect(screen.getByText("User")).toBeInTheDocument();
        //expect(screen.getByText("Role Description")).toBeInTheDocument();
        //expect(screen.getByText("Regular User")).toBeInTheDocument();
        expect(screen.getByText("Data Custodian")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <ViewDataScope datascope={datascope} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
