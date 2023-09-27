import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import EditDataScopePopup from "../../Edit/EditDataScopePopup";

describe("EditDataScope Component", () => {
    const datascope = {
        ds_name: "Datascope 1",
        ds_description: "Data scope for time management",
        status: "Approved"
    };

    it("renders correctly with data scope data", () => {
        const { getByText } = render(
            <EditDataScopePopup datascope={datascope} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Edit Data Scope")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Datascope 1")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Data scope for time management")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        //expect(screen.getByTestId("editDSStatusDropdown")).toBeInTheDocument(); Need to fix this
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <EditDataScopePopup datascope={datascope} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
