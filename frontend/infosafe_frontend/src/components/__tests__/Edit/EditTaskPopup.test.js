import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UpdateTask from "../../Edit/EditTaskPopup";
//import EditUser from "../../Edit/EditUser"; // Import your component here

describe("EditTask Component", () => {
    const task = {
        task_id: '',
        task_name: 'Task 1',
        date_created: '',
        due_date: '',
        task_description: 'description 1',
        task_status: 'High',
        data_scope_id: {
            ds_name: 'datascope 1'
        },
        daysUntilDue: '2023/10/10'
    };

    it("renders correctly with task data", () => {
        const { getByText } = render(
            <UpdateTask task={task} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Update Task")).toBeInTheDocument();
        expect(screen.getByText("Task Name")).toBeInTheDocument();
        expect(screen.getByText("Task 1")).toBeInTheDocument();
        expect(screen.getByText("Data Scope")).toBeInTheDocument();
        expect(screen.getByText("datascope 1")).toBeInTheDocument();
        expect(screen.getByText("Task Description")).toBeInTheDocument();
        expect(screen.getByText("description 1")).toBeInTheDocument();
        expect(screen.getByText("Assigned Users:")).toBeInTheDocument();
        expect(screen.getByText("Add More Assignees")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("High")).toBeInTheDocument();
        expect(screen.getByText("Completion Date")).toBeInTheDocument();
        //expect(screen.getByText("2023/10/10")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <UpdateTask task={task} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
