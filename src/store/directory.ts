import { atom } from "recoil";
import { SectionDetails } from "../utils/types";

export const section1:SectionDetails[] = [
        { title: 'hat', url: 'https://i.ibb.co/cvpntL1/hats.png', id: 1 },
        { title: 'jacket', url: 'https://i.ibb.co/px2tCc3/jackets.png', id: 2 },
        { title: 'sneaker', url: 'https://i.ibb.co/0jqHpnp/sneakers.png', id: 3 },
]

export const directoryAtom = atom<SectionDetails[]>({
    key: 'directoryAtom',
    default: section1
})