import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import Nav from './../NavBar.js';

test('should render Home component', () => {
    render(<Nav/>);
    const button = screen.getByRole('button', { name: 'Users'});
})