import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ViewTask from "../../View/ViewTaskPopup";

describe("ViewTaskPopup Component", () => {
    const task = {
        task_name: "Task 1",
        task_description: "Create new users",
        due_date: "2023-11-11",
        task_status: "High",
        data_scope_id: {
            ds_name: "Data Scope A"
        }
    };

    it("renders correctly with task popup data", () => {
        const { getByText } = render(
            <ViewTask task={task} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("View Task")).toBeInTheDocument();
        expect(screen.getByText("Task Name")).toBeInTheDocument();
        expect(screen.getByText("Task 1")).toBeInTheDocument();
        expect(screen.getByText("Data Scope")).toBeInTheDocument();
        expect(screen.getByText("Data Scope A")).toBeInTheDocument();
        expect(screen.getByText("Task Description")).toBeInTheDocument();
        expect(screen.getByText("Create new users")).toBeInTheDocument();
        expect(screen.getByText("Task Priority")).toBeInTheDocument();
        expect(screen.getByText("High")).toBeInTheDocument();
        expect(screen.getByText("Completion Date")).toBeInTheDocument();
        expect(screen.getByText("2023-11-11")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <ViewTask task={task} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
