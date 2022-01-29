import { atom } from "recoil";
import { UUID, ProductDetails } from '../utils/types'

export const itemCountAtom = atom<number>({
    key: 'itemCountAtom',
    default: 0
})

export const cartItemsAtom = atom<ProductDetails[]>({
    key: 'cartItemsAtom',
    default: [] as ProductDetails[]
})

export const cartHiddenAtom = atom<boolean>({
    key: 'cartHiddenAtom',
    default: true
})

