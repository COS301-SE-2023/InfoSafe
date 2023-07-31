import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home.js';
import '@testing-library/jest-dom';

describe('Home', () => {
    test('should render NavBar component with the correct systemRole prop', () => {
        const systemRole = 'ISO';

        render(<Home />);

        const navBarElement = screen.getByTestId('nav-bar');

        expect(navBarElement).toBeInTheDocument();
        expect(navBarElement).toHaveAttribute('systemRole', systemRole);
    });
});
