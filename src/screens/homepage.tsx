import { FC } from "react";
import { useRecoilValue } from "recoil";
import { SectionDetails } from "../utils/types";
import MenuItem from "../components/products/MenuItem";
import { directoryAtom } from "../store/directory";

const section2:SectionDetails[] = [
    { title: 'womens', url: 'https://i.ibb.co/GCCdy8t/womens.png', id: 4 },
    { title: 'mens', url: 'https://i.ibb.co/R70vBrQ/mens.png', id: 5 },
]

const Homepage: FC = () => {
    const section = useRecoilValue(directoryAtom)
    return (
        <>
            <div className="mb-5 grid grid-cols-3 gap-7">
                {section && section?.length > 0 && section?.map(v => {
                    return <MenuItem title={v.title} url={v.url} key={v.id} height={'250px'} />
                })}
            </div>
            <div className="mb-5 grid grid-cols-2 gap-7">
                {section2 && section2?.length > 0 && section2?.map(v => {
                    return <MenuItem title={v.title} url={v.url} key={v.id} height={'350px'} />
                })}
            </div>
        </>
    )
}

export default Homepage