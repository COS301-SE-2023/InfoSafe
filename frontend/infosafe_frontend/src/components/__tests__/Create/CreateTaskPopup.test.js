import React, {useState} from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CreateTaskPopup from "../../Create/CreateTaskPopup.js";

describe("CreateTask Component", () => {
    it("renders correctly with task data", () => {
        const { getByText } = render(
            <CreateTaskPopup popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText("Create Task")).toBeInTheDocument();
        expect(screen.getByText("Type Name")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        expect(screen.getByText("Type Description")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        expect(screen.getByText("Task Status")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        expect(screen.getByText("Assignees")).toBeInTheDocument();
        //expect(screen.getByText("")).toBeInTheDocument();
        expect(screen.getByText("Data Scope")).toBeInTheDocument();
        expect(screen.getByText("Completion Date")).toBeInTheDocument();
    });

    it("calls popupClose when back button is clicked", () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <CreateTaskPopup popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId("back-button"); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
