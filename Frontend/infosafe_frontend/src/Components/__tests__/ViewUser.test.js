import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ViewUser from '../ViewUser.js';
import '@testing-library/jest-dom';

describe('ViewUser', () => {
    test('should display the user information correctly', () => {
        const user = {
            firstname: 'John',
            lastname: 'Doe',
            email: 'john.doe@example.com',
            role: 'Administrator'
        };
        const popupOpen = true;
        const popupClose = jest.fn();

        render(<ViewUser user={user} popupClose={popupClose} popupOpen={popupOpen} />);

        const nameDisplay = screen.getByText('Name');
        const surnameDisplay = screen.getByText('Surname');
        const emailDisplay = screen.getByText('Email');
        const roleDisplay = screen.getByText('System Role');
        const backButton = screen.getByRole('button', { name: 'Back' });

        const viewName = screen.getByText(user.firstname);
        const viewSurname = screen.getByText(user.lastname);
        const viewEmail = screen.getByText(user.email);
        const viewRole = screen.getByText(user.role);

        expect(nameDisplay).toBeInTheDocument();
        expect(surnameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(roleDisplay).toBeInTheDocument();
        expect(viewName).toBeInTheDocument();
        expect(viewSurname).toBeInTheDocument();
        expect(viewEmail).toBeInTheDocument();
        expect(viewRole).toBeInTheDocument();

        fireEvent.click(backButton);

        expect(popupClose).toHaveBeenCalledTimes(1);
    });
});
