import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CreateUserPopup } from '../CreateUserPopup.js';
import '@testing-library/jest-dom';
describe('CreateUserPopup', () => {
    test('should submit user data when form is filled and submit button is clicked', async () => {
        // Render the component
        render(<CreateUserPopup popupOpen={true} popupClose={jest.fn()} />);

        // Fill the form inputs
        fireEvent.change(screen.getByTestId('nameInput'), { target: { value: 'John' } });
        fireEvent.change(screen.getByTestId('surnameInput'), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByTestId('emailInput'), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'password123' } });

        // Click the submit button
        fireEvent.click(screen.getByTestId('createuser_finish'));

        // Wait for the fetch request to complete
        await screen.findByText('New User added');

        // Assertions
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:8080/api/auth/add',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstname: 'John',
                    lastname: 'Doe',
                    email: 'john.doe@example.com',
                    password: 'password123',
                    role: '',
                }),
            })
        );
    });
});
