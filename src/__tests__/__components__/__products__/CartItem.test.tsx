import { render, screen } from '@testing-library/react';
import CartItem from '../../../components/products/CartItem';
import { ProductDetails } from '../../../utils/types';

describe('CartItem', () => {
  it('should render  data passed in props', async () => {
    const CartItemProps:ProductDetails = {
        id: "1112f22-55v52-5df222-dfg52f1",
        name:'AirMax',
        cover: 'http://guillaumemorin.png',
        category: 'sneaker',
        price: 49.9,
        quantity: 3,
    }
    render(
      <CartItem {...CartItemProps}/>
  );
    const nameElement = screen.getByText(/AirMax/i);
    const priceElement = screen.getByText(/49.9/i);
    const quantityElement = screen.getByText(/3/i);
    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(quantityElement).toBeInTheDocument();
  });
})