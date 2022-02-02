import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItemProps } from "../../utils/types";

const MenuItem = ({ title, url, height }: MenuItemProps) => {
    const navigate = useNavigate()
    return (

            <div className="mb-2 bg-white rounded overflow-hidden shadow-md home text-center relative" 
                style={{backgroundImage: `url(${url})`, 
                    backgroundPosition: 'center', 
                    backgroundSize: 'cover',
                    height: `${height}`,
                    cursor: 'pointer'}}
                    onClick={() => navigate(`/shop/${title}`)}
                >
                    <div className="home-card-body mx-auto p-3 absolute w-full top-1/2 left-1/2" style={{ transform: "translate(-50%, -50%)"}}>
                        <Fragment>{title}</Fragment>
                        <br />
                        <Fragment>SHOP NOW</Fragment>
                    </div>
            </div>
    )
}

export default MenuItem