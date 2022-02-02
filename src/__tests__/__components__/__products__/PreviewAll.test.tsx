import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import PreviewAll from '../../../components/products/PreviewAll';
import { PreviewAllProps, ProductDetails } from '../../../utils/types';

const MockPreviewAll = ({ items, title }:PreviewAllProps) => (
  <RecoilRoot>
    <PreviewAll title={title} items={items}/>
  </RecoilRoot>
)

describe('PreviewAll', () => {
  it('check when getProducts by collection is not empty and lenght of tab', async () => {
    const PreviewAllProps:ProductDetails[] = [
      {
        id: "1112f22-55v52-5df222-dfg52f1",
        name:'AirMax',
        cover: 'http://guillaumemorin.png',
        category: 'sneaker',
        price: 49.9,
        quantity: 3,
      },
      {
        id: "1122-9912-5df222-d52f1",
        name:'Shirt Adidas',
        cover: 'http://guillaumemorin.jpg',
        category: 'hat',
        price: 41.9,
        quantity: 1,
      },
      {
        id: "1122-9583632-5df222-d52f1",
        name:'Nike',
        cover: 'http://guillaumemorin.jpeg',
        category: 'sneaker',
        price: 47.9,
        quantity: 1,
      }
    ]
    render( <MockPreviewAll title="sneaker" items={PreviewAllProps} /> )
    const firstItemElement = await screen.queryByTestId("item-0");
    const secondItemElement = await screen.queryByTestId("item-1");
    const thirdItemElement = await screen.queryByTestId("item-2");
    const allElement = await screen.queryAllByTestId(/item-/i)
    const titleElement = await screen.queryByText(/sneaker/i);

    
    expect(allElement.length).toBe(2);
    expect(firstItemElement).toBeInTheDocument();
    expect(secondItemElement).toBeInTheDocument();
    expect(thirdItemElement).not.toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });

  it('check when getProducts is empty', async () => {
    const PreviewAllProps:ProductDetails[] = []
    render( <MockPreviewAll title="hat" items={PreviewAllProps} /> )
    const firstItemElement = await screen.queryByTestId("item-0");
    expect(firstItemElement).not.toBeInTheDocument();
  });

  it('check when getProducts is null', async () => {
    const PreviewAllProps:ProductDetails[] | null = null
    render( <MockPreviewAll title="hat" items={PreviewAllProps} /> )
    const firstItemElement = await screen.queryByTestId("item-0");
    const titleElement = await screen.queryByText(/hat/i);
    expect(firstItemElement).not.toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
  });
})