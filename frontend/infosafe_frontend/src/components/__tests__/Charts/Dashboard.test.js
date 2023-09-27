import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Dashboard from "../../Charts/Dashboard"; // Import your component here

describe("Dashboard Component", () => {
    const user = {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        role: {
            role_name: "User",
        },
    };
    let datascopeDisplay = 2;

    it("renders correctly with dashboard data", () => {
        const { getByText } = render(
            <Dashboard />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Current Data Scopes")).toBeInTheDocument();
        //expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("Current Tasks")).toBeInTheDocument();
        expect(screen.getByText("Current Devices")).toBeInTheDocument();
        expect(screen.getByText("Current Requests")).toBeInTheDocument();
        expect(screen.getByText("System Analytics")).toBeInTheDocument();
        expect(screen.getByText("System Total")).toBeInTheDocument();
        expect(screen.getByText("My Total")).toBeInTheDocument();
        expect(screen.getByText("System Analytics")).toBeInTheDocument();
        expect(screen.getByText("System Total")).toBeInTheDocument();
        expect(screen.getByText("My Total")).toBeInTheDocument();
        expect(screen.getByText("Tasks")).toBeInTheDocument();
        expect(screen.getByText("Tasks Left")).toBeInTheDocument();
        expect(screen.getByText("Tasks Completed")).toBeInTheDocument();
        expect(screen.getByText("Approaching Deadlines")).toBeInTheDocument();
        expect(screen.getByText("Devices in Use")).toBeInTheDocument();
        expect(screen.getByText("Notifications")).toBeInTheDocument();
    });
});
