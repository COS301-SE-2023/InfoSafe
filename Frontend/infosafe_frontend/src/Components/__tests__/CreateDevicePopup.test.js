import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreateDevicePopup } from '../CreateDevicePopup.js';
import '@testing-library/jest-dom';

describe('CreateDevicePopup', () => {
    test('should submit the form with the entered data when "Submit" button is clicked', () => {
        const popupOpen = true;
        const popupClose = jest.fn();

        render(<CreateDevicePopup popupOpen={popupOpen} popupClose={popupClose} />);

        const assetNameInput = screen.getByLabelText('Device Type');
        const assetDescriptionInput = screen.getByLabelText('Device Description');
        const assignedUserInput = screen.getByLabelText('Assigned User');
        const statusDropdown = screen.getByRole('combobox', { name: 'Status' });
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        const assetName = 'Test Device';
        const assetDescription = 'This is a test device';
        const assignedUser = 'John Doe';
        const status = 'FULL';

        fireEvent.change(assetNameInput, { target: { value: assetName } });
        fireEvent.change(assetDescriptionInput, { target: { value: assetDescription } });
        fireEvent.change(assignedUserInput, { target: { value: assignedUser } });
        fireEvent.change(statusDropdown, { target: { value: status } });
        fireEvent.click(submitButton);

        expect(popupClose).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith({
            asset_name: assetName,
            asset_description: assetDescription,
            assignee: assignedUser,
            date_acquired: expect.any(String),
            status: status
        });
    });
});
