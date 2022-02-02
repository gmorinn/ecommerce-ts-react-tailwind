import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import MenuItem from '../../../components/products/MenuItem';

describe('MenuItem', () => {
  it('should render same title passed in props', async () => {
    render(
    <BrowserRouter>
      <MenuItem title='AirMax' url='http://guillaumemorin.png' height='20px' />
    </BrowserRouter>
  );
    const titleElement = screen.getByText(/AirMax/i);
    expect(titleElement).toBeInTheDocument();
  });

  
})