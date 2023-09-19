import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ViewAssetRequest from '../../View/ViewAssetRequest';

describe('ViewAsset Component', () => {
    const asset = {
        asset_id: 'Dell XPS',
        user_id: 'John Doe',
        reason: 'Need new Laptop',
        desired_date: '2023-11-11'
    };

    it('renders correctly with asset data', () => {
        const { getByText } = render(
            <ViewAssetRequest asset={asset} popupOpen={true} popupClose={() => {}} />
        );

        // Ensure that the component renders with user data
        expect(screen.getByText('View Asset Request')).toBeInTheDocument();
        expect(screen.getByText('Device Name')).toBeInTheDocument();
        expect(screen.getByText('Dell XPS')).toBeInTheDocument();
        expect(screen.getByText('User')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Reason')).toBeInTheDocument();
        expect(screen.getByText('Need new Laptop')).toBeInTheDocument();
        expect(screen.getByText('Date Required')).toBeInTheDocument();
        expect(screen.getByText('2023-11-11')).toBeInTheDocument();
    });

    it('calls popupClose when back button is clicked', () => {
        const popupCloseMock = jest.fn();

        const { getByTestId } = render(
            <ViewAssetRequest asset={asset} popupOpen={true} popupClose={popupCloseMock} />
        );

        // eslint-disable-next-line testing-library/prefer-screen-queries
        const backButton = getByTestId('back-button'); // Select the button by test ID
        fireEvent.click(backButton);

        // Ensure that popupClose was called when the back button is clicked
        expect(popupCloseMock).toHaveBeenCalled();
    });
});
