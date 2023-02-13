import React from "react";
import "./Helmet.css"
const Helmet = (props) => {
    document.title = 'Maltimart - ' + props.title 
    return(
        <>
            <div className="w-100">{props.children}</div>
        </>
    )
}
export default Helmet