/*
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Nav from './../NavBar.js';

test('should render Home component', () => {
    render(<Nav />);
    const button = screen.getByRole('button', { name: 'Users' });
});
*/
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavBar from '../NavBar.js';
import '@testing-library/jest-dom';

describe('NavBar', () => {
    test('renders the navbar tabs', () => {
        render(<NavBar systemRole="ISO" />);

        const tabs = screen.getAllByRole('listitem');
        expect(tabs).toHaveLength(7);

        const tabLabels = tabs.map((tab) => tab.textContent);
        expect(tabLabels).toEqual([
            'Users',
            'Data Scopes',
            'Access Requests',
            'Compliance Matrix',
            'Devices',
            'Support Requests',
            'Risks',
        ]);
    });

    test('renders user list when Users tab is active', () => {
        render(<NavBar systemRole="ISO" />);

        const usersTab = screen.getByText('Users');
        userEvent.click(usersTab);

        // Assert that the user list is rendered
        const userList = screen.getByRole('list', { name: 'User List' });
        expect(userList).toBeInTheDocument();

        // You can add additional assertions for the user list content if needed
    });

    // Add more tests for other tabs and functionality as needed
});

