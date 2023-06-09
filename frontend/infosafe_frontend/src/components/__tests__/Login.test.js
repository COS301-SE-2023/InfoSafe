import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Login';

describe('login', () => {
    afterEach(cleanup);
    test('renders the login page', () => {
        const { getByText } = render(<Login />);

        const loginFrom1 = getByText('Login', { selector: 'p.logo' });
        expect(loginFrom1).toBeInTheDocument();
        const loginFrom2 = getByText('Username', { selector: 'p.username' });
        expect(loginFrom2).toBeInTheDocument();
        const loginFrom3 = getByText('', { selector: 'input.untxt' });
        expect(loginFrom3).toBeInTheDocument();
        const loginFrom4 = getByText('Password', { selector: 'p.pass' });
        expect(loginFrom4).toBeInTheDocument();
        const loginFrom5 = getByText('', { selector: 'input.pwtxt' });
        expect(loginFrom5).toBeInTheDocument();
        const loginFrom6 = getByText('Forgot Password?', { selector: 'a.forgot' });
        expect(loginFrom6).toBeInTheDocument();
        const loginFrom7 = getByText('Login', { selector: 'button.btnLogin' });
        expect(loginFrom7).toBeInTheDocument();
    });

    test('handles input changes correctly', () => {
        const { getAllByTestId } = render(<Login />);

        const { getByLabelText } = render(<Login />);
        const usernameInput = getAllByTestId('userIn')[0];
        const passwordInput = getAllByTestId('passIn')[0];

        // Simulate user input
        fireEvent.change(usernameInput, { target: { value: 'john_doe' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        // Check if input values are updated correctly
        expect(usernameInput.value).toBe('john_doe');
        expect(passwordInput.value).toBe('password123');
    });

    /*test('calls login function on button click', () => {
        const mockLogin = jest.fn();
        render(<Login onLogin={mockLogin} />);

        const loginButton = screen.getByTestId('btnTest');
        console.log('loginButton:', loginButton);

        fireEvent.click(loginButton);

        console.log('mockLogin calls:', mockLogin.mock.calls);
        expect(mockLogin).toHaveBeenCalledTimes(1);
    });*/
});
