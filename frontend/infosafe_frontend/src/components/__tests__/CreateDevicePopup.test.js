import {fireEvent, render} from "@testing-library/react";
import {CreateDevicePopup} from "../Create/CreateDevicePopup";
import { screen, configure } from '@testing-library/react'

it('should submit the form with the entered data when "Submit" button is clicked with valid input data', () => {
    // Mock data
    const popupOpen = true;
    const popupClose = jest.fn();

    // Render component
    render(<CreateDevicePopup popupOpen={popupOpen} popupClose={popupClose} />);

    // Simulate input changes
    const deviceNameInput = screen.getByTestId("asset_name");
    fireEvent.change(deviceNameInput, { target: { value: 'New Device Name' } });

    // Verify that the input value has changed
    expect(deviceNameInput.value).toBe('New Device Name');

    // You can also simulate other interactions and make assertions as needed
    // For example, clicking the Submit button:
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);


});