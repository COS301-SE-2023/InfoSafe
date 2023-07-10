import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ViewDataScope from '../ViewDataScope.js';
import '@testing-library/jest-dom';

describe('ViewDataScope', () => {
    test('should display the data scope information correctly', () => {
        const datascope = {
            ds_name: 'Data Scope 1',
            description: 'Data Scope description',
            date_captured: '2023-06-26',
            status: 'Pending Approval'
        };
        const popupOpen = true;
        const popupClose = jest.fn();

        render(
            <ViewDataScope datascope={datascope} popupClose={popupClose} popupOpen={popupOpen} />
        );

        const datascopeName = screen.getByText('Name');
        const datascopeDescription = screen.getByText('Description');
        const datascopeDate = screen.getByText('Date Captured');
        const datascopeStatus = screen.getByText('Status');
        const backButton = screen.getByRole('button', { name: 'Back' });

        const viewDataScopeName = screen.getByText(datascope.ds_name);
        const viewDataScopeDescription = screen.getByText(datascope.description);
        const viewDataScopeDate = screen.getByText(datascope.date_captured);
        const viewDataScopeStatus = screen.getByText(datascope.status);

        expect(datascopeName).toBeInTheDocument();
        expect(datascopeDescription).toBeInTheDocument();
        expect(datascopeDate).toBeInTheDocument();
        expect(datascopeStatus).toBeInTheDocument();
        expect(viewDataScopeName).toBeInTheDocument();
        expect(viewDataScopeDescription).toBeInTheDocument();
        expect(viewDataScopeDate).toBeInTheDocument();
        expect(viewDataScopeStatus).toBeInTheDocument();

        fireEvent.click(backButton);

        expect(popupClose).toHaveBeenCalledTimes(1);
    });
});
