import {fireEvent, render} from "@testing-library/react";
import {CreateDevicePopup} from "../Create/CreateDevicePopup";
import { screen, configure } from '@testing-library/react'

it('should submit the form with the entered data when "Submit" button is clicked with valid input data', () => {
    // Mock data
    const popupOpen = true;
    const popupClose = jest.fn();

    // Render component
    render(<CreateDevicePopup popupOpen={popupOpen} popupClose={popupClose} />);

    // Get form elements
    const assetNameInput = screen.getByText('Device Name');
    const assetTypeInput = screen.getByText('Device Type');
    const assetDescriptionInput = screen.getByText('Device Description');
    //const usedDropdown = screen.getByRole('combobox', { name: 'New' });
    //const availableDropdown = screen.getByRole('combobox', { name: 'Available' });
    //const statusDropdown = screen.getByRole('combobox', { name: 'Status' });
    //const submitButton = screen.getByRole('button', { name: 'Submit' });
    const currentCustodianInput = screen.getByText('Current Custodian');
    const previousCustodianInput = screen.getByText('Previous Custodian');

    // Set input values
    const assetName = 'Test Device';
    const assetDescription = 'This is a test device';
    //const assignedUser = 'John Doe';
    const status = 'FULL';

    fireEvent.change(assetNameInput, { target: { value: assetName } });
    fireEvent.change(assetDescriptionInput, { target: { value: assetDescription } });
    //fireEvent.change(assignedUserInput, { target: { value: assignedUser } });
    fireEvent.change(statusDropdown, { target: { value: status } });

    // Submit form
    fireEvent.click(submitButton);

    // Verify form submission
    expect(popupClose).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith({
        asset_name: assetName,
        asset_description: assetDescription,
        //assignee: assignedUser,
        date_acquired: expect.any(String),
        status: status
    });
});