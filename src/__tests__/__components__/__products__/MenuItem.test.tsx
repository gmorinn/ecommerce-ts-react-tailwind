import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import MenuItem from '../../../components/products/MenuItem';
import { MenuItemProps } from '../../../utils/types';

const MockMenuItem = ({ title, url, height }:MenuItemProps) => (
  <BrowserRouter>
      <MenuItem title={title} url={url} height={height} />
   </BrowserRouter>
)

describe('MenuItem', () => {
  it('should render same title passed in props', async () => {
    render(
      <MockMenuItem title='AirMax' url='http://guillaumemorin.png' height='20px' />
  );
    const titleElement = screen.getByText(/AirMax/i);
    expect(titleElement).toBeInTheDocument();
  });
})