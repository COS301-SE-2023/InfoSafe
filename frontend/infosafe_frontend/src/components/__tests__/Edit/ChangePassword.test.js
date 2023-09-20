import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ChangePassword from '../../Edit/ChangePassword'; // Import your component here

describe('ChangePassword Component', () => {
    it('renders correctly with password data', () => {
        const { getByText } = render(
            <ChangePassword popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText('Change Password')).toBeInTheDocument();
        expect(screen.getByText('Enter Password')).toBeInTheDocument();
        //expect(screen.getByDisplayValue('example@example.com')).toBeInTheDocument(); Fix this
        expect(screen.getByText('Re-Enter Password')).toBeInTheDocument();
        //expect(screen.getByDisplayValue('new@example.com')).toBeInTheDocument(); Fix this
    });

    it('calls popupClose when back button is clicked', () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <ChangePassword popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId('back-button'); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
