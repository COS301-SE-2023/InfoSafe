import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EditDevice from '../../Edit/EditDevice';

describe('EditDevice Component', () => {
    const asset = {
        asset_name: 'Dell XPS',
        device_type: 'Laptop',
        asset_description: 'Portable Computer',
        used: 'Yes',
        availability: 'No',
        status: 'Cleaned',
        current_assignee: 'John Doe',
        previous_assignee: 'Jane Doe'
    };

    it('renders correctly with asset data', () => {
        const { getByText } = render(
            <EditDevice asset={asset} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText('Edit Device')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Portable Computer')).toBeInTheDocument();
        expect(screen.getByText('Available')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Cleaned')).toBeInTheDocument();
        expect(screen.getByText('Current Custodian')).toBeInTheDocument();
        expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Previous Custodian')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Jane Doe')).toBeInTheDocument();
    });

    it('calls popupClose when back button is clicked', () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <EditDevice asset={asset} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId('back-button'); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
