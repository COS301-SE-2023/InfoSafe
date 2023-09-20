import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import UpdateTask from '../../Edit/UpdateTaskPopup';

describe('UpdateTaskPopup Component', () => {
    const task = {
        task_id: '1',
        task_description: 'Create new users',
        due_date: '2023-11-11'
    };

    it('renders correctly with task popup data', () => {
        const { getByText } = render(
            <UpdateTask task={task} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText('Update Task')).toBeInTheDocument();
        expect(screen.getByText('Task ID')).toBeInTheDocument();
        expect(screen.getByText('TASK 1')).toBeInTheDocument();
        expect(screen.getByText('Assignee')).toBeInTheDocument();
        expect(screen.getByText('USER A')).toBeInTheDocument();
        expect(screen.getByText('Task Description')).toBeInTheDocument();
        //expect(screen.getByText('Create new users')).toBeInTheDocument(); Fix this
        expect(screen.getByText('Completion Date')).toBeInTheDocument();
        //expect(screen.getByText('2023-11-11')).toBeInTheDocument(); Fix this
    });

    it('calls popupClose when back button is clicked', () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <UpdateTask task={task} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId('back-button'); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
