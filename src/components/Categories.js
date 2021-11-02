import React from 'react';


export default function Categories(props){      

    return(
        <div className="c-cb">
                <input id={props.categoryid} type="checkbox" checked={props.checked} onChange={()=>props.toggleChecked(props.categoryid,props.categoryname,props.restaurantid)} />
                {/*send id of changed checkbox to function. function uses id to execute function code (on block with same id)*/}
                <button><span className="slider"></span></button>
            <label>{props.categoryname}</label>
        </div>
    );
}