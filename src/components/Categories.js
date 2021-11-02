import React from 'react';


export default function Categories(props){      

    return(
        <div className="c-cb">
                <input id={props.groupid} type="checkbox" defaultChecked={props.checked} onChange={()=>props.toggleChecked(props.groupid,props.groupname,props.categoryid)} />
                {/*send id of changed checkbox to function. function uses id to execute function code (on block with same id)*/}
                <button><span className="slider"></span></button>
            <label>{props.groupname}</label>
        </div>
    );
}