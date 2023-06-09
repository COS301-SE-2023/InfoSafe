import Home from './../Home.js'
import { render, screen, cleanup } from '@testing-library/react'

test('should render Home component', () => {
    render(<Home/>);
})