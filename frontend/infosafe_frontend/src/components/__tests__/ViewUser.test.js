// import {render, screen, cleanup} from '@testing-library/react';
// import ViewUser from '../View/ViewUser'
//
// test('Should render View user', () => {
//     render(<ViewUser/>);
//     const viewuserElement = screen.getByTestId('viewUser');
//     expect(viewuserElement).toBeInTheDocument();
// })

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ViewUser from '../View/ViewUser'; // Import your component here

describe('ViewUser Component', () => {
    const user = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        role: 'User',
    };

    it('renders correctly with user data', () => {
        const { getByText } = render(
            <ViewUser user={user} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText('View User')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Surname')).toBeInTheDocument();
        expect(screen.getByText('Doe')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        expect(screen.getByText('System Role')).toBeInTheDocument();
        expect(screen.getByText('User')).toBeInTheDocument();
    });

    it('calls popupClose when back button is clicked', () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <ViewUser user={user} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId('back-button'); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
