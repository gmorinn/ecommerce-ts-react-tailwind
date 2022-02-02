import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import PreviewCollection from '../../../components/products/PreviewCollection';
import { PreviewCollectionProps, ProductDetails } from '../../../utils/types';

const MockPreviewCollection = ({ items }:PreviewCollectionProps) => (
  <RecoilRoot>
    <PreviewCollection items={items}/>
  </RecoilRoot>
)

describe('PreviewCollection', () => {
  it('check when getProducts is not empty and lenght of tab', async () => {
    const PreviewCollectionProps:ProductDetails[] = [
      {
        id: "1112f22-55v52-5df222-dfg52f1",
        name:'AirMax',
        cover: 'http://guillaumemorin.png',
        category: 'shoes',
        price: 49.9,
        quantity: 3,
      },
      {
        id: "1122-99/2-5df222-d52f1",
        name:'Nike',
        cover: 'http://guillaumemorin.jpeg',
        category: 'shoes',
        price: 47.9,
        quantity: 1,
      }
    ]
    render( <MockPreviewCollection items={PreviewCollectionProps} /> )
    const firstItemElement = await screen.queryByTestId("item-0");
    const secondItemElement = await screen.queryByTestId("item-1");
    const thirdItemElement = await screen.queryByTestId("item-2");
    const allElement = await screen.queryAllByTestId(/item-/i)
  
    expect(allElement.length).toBe(2);
    expect(firstItemElement).toBeInTheDocument();
    expect(secondItemElement).toBeInTheDocument();
    expect(thirdItemElement).not.toBeInTheDocument();
  });

  it('check when getProducts is empty', async () => {
    const PreviewCollectionProps:ProductDetails[] = []
    render( <MockPreviewCollection items={PreviewCollectionProps} /> )
    const firstItemElement = await screen.queryByTestId("item-0");
    expect(firstItemElement).not.toBeInTheDocument();
  });

  it('check when getProducts is null', async () => {
    const PreviewCollectionProps:ProductDetails[] | null = null
    render( <MockPreviewCollection items={PreviewCollectionProps} /> )
    const firstItemElement = await screen.queryByTestId("item-0");
    expect(firstItemElement).not.toBeInTheDocument();
  });
})