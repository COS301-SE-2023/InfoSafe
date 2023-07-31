import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ViewDevice } from '../View/ViewDevice.js';
import '@testing-library/jest-dom';

describe('ViewDevice', () => {
    test('should display the device information correctly', () => {
        const asset = {
            asset_name: 'Device 1',
            asset_description: 'Device description',
            status: 'Active',
            assignee: 'John Doe'
        };
        const popupOpen = true;
        const popupClose = jest.fn();

        render(<ViewDevice asset={asset} popupClose={popupClose} popupOpen={popupOpen} />);

        const deviceTypeLabel = screen.getByText('Device Type');
        const deviceDescriptionLabel = screen.getByText('Device Description');
        const statusLabel = screen.getByText('Status');
        const assignedLabel = screen.getByText('Assigned User');
        const backButton = screen.getByRole('button', { name: 'Back' });

        const deviceType = screen.getByText(asset.asset_name);
        const deviceDescription = screen.getByText(asset.asset_description);
        const status = screen.getByText(asset.status);
        const assignee = screen.getByText(asset.assignee);

        expect(deviceTypeLabel).toBeInTheDocument();
        expect(deviceDescriptionLabel).toBeInTheDocument();
        expect(statusLabel).toBeInTheDocument();
        expect(assignedLabel).toBeInTheDocument();
        expect(deviceType).toBeInTheDocument();
        expect(deviceDescription).toBeInTheDocument();
        expect(status).toBeInTheDocument();
        expect(assignee).toBeInTheDocument();

        fireEvent.click(backButton);

        expect(popupClose).toHaveBeenCalledTimes(1);
    });
});
