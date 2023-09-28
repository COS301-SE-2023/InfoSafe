import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RoleCreation from "../../Roles/RoleCreation"; // Import your component here

describe("RoleCreation Component", () => {
    const user = {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        role: {
            role_name: "User",
        },
    };
    const subsystems = ['Users', 'Data Scopes', 'Access Requests', 'Tasks', 'Devices', 'Support Requests', 'Asset Requests', 'Risks', 'Requests'];

    it("renders correctly with role data", () => {
        const { getByText } = render(
            <RoleCreation />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Role Name:")).toBeInTheDocument();
        expect(screen.getByText("Create Users")).toBeInTheDocument();
        expect(screen.getByText("Edit Users")).toBeInTheDocument();
        expect(screen.getByText("Delete Users")).toBeInTheDocument();
        expect(screen.getByText("Create Data Scopes")).toBeInTheDocument();
        expect(screen.getByText("Edit Data Scopes")).toBeInTheDocument();
        expect(screen.getByText("Delete Data Scopes")).toBeInTheDocument();
        expect(screen.getByText("Edit Access Requests")).toBeInTheDocument();
        expect(screen.getByText("Approve Access Requests")).toBeInTheDocument();
        expect(screen.getByText("Create Tasks")).toBeInTheDocument();
        expect(screen.getByText("Edit Tasks")).toBeInTheDocument();
        expect(screen.getByText("Delete Tasks")).toBeInTheDocument();
        expect(screen.getByText("Approve Tasks")).toBeInTheDocument();
        expect(screen.getByText("Create Devices")).toBeInTheDocument();
        expect(screen.getByText("Edit Devices")).toBeInTheDocument();
        expect(screen.getByText("Delete Devices")).toBeInTheDocument();
        expect(screen.getByText("View All Support Requests")).toBeInTheDocument();
        expect(screen.getByText("Edit Support Requests")).toBeInTheDocument();
        expect(screen.getByText("Delete Support Requests")).toBeInTheDocument();
        expect(screen.getByText("Review Asset Requests")).toBeInTheDocument();
        expect(screen.getByText("Create Risks")).toBeInTheDocument();
        expect(screen.getByText("Edit Risks")).toBeInTheDocument();
        expect(screen.getByText("Delete Risks")).toBeInTheDocument();
        expect(screen.getByText("Review Risks")).toBeInTheDocument();
        expect(screen.getByText("Create Asset Requests")).toBeInTheDocument();
        expect(screen.getByText("Create Support Requests")).toBeInTheDocument();
        expect(screen.getByText("Create Access Requests")).toBeInTheDocument();

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
