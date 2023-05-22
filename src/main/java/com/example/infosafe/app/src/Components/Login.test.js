import {render, screen, cleanup, getByTestId} from "@testing-library/react";
import Login from './Login'

describe('login', () =>{
    test('renders the login page', () => {
        const { getByText, getByLabelText } = render(<Login />);

        //Check for elements being rendered
        const loginFrom1 = getByText('Login', {selector: 'p.logo'});
        expect(loginFrom1).toBeInTheDocument();
        const loginFrom2 = getByText('Username', {selector: 'p.username'});
        expect(loginFrom2).toBeInTheDocument();
        const loginFrom3 = getByText('', {selector: 'input.untxt'});
        expect(loginFrom3).toBeInTheDocument();
        const loginFrom4 = getByText('Password', {selector: 'p.pass'});
        expect(loginFrom4).toBeInTheDocument();
        const loginFrom5 = getByText('', {selector: 'input.pwtxt'});
        expect(loginFrom5).toBeInTheDocument();
        const loginFrom6 = getByText('Forgot Password?', {selector: 'a.forgot'});
        expect(loginFrom6).toBeInTheDocument();
        const loginFrom7 = getByText('Login', {selector: 'button.btnLogin'});
        expect(loginFrom7).toBeInTheDocument();
    });
});