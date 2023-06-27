import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CreateDataScopePopup } from '../CreateDataScopePopup.js';
import '@testing-library/jest-dom';

describe('CreateDataScopePopup', () => {
    test('should submit data scope when form is filled and submit button is clicked', async () => {
        // Render the component
        render(<CreateDataScopePopup popupOpen={true} popupClose={jest.fn()} />);

        // Fill the form inputs
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Data Scope 1' } });
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'This is a test data scope.' } });

        // Add a new role
        fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'New Role' } });
        fireEvent.change(screen.getByLabelText('Role Description'), { target: { value: 'New role description' } });
        fireEvent.click(screen.getByText('Add Role'));

        // Click the submit button
        fireEvent.click(screen.getByText('Submit'));

        // Wait for the fetch request to complete
        await screen.findByText('New DataScope added');

        // Assertions
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:8080/api/auth/addDs',
            expect.objectContaining({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ds_name: 'Data Scope 1',
                    description: 'This is a test data scope.',
                    role_name: 'General User',
                    role_description: 'Can use basic functionality of the product',
                    date_captured: expect.any(String),
                    data_custodian: 'LoggedIn User',
                    administrator: 'Admin1',
                    status: 'Pending Approval',
                }),
            })
        );
    });
});
