import React, {useState} from 'react';
import CategorizeButton from './Modal';


export default function Restaurant(props){

  //variables
  const [isRenaming,setRename]=useState(false);
  const [newName, setName]=useState('');

  //Restaurant component functions

  function handleSubmit(e){
    e.preventDefault();
    (newName!=='') && props.editRestaurant(props.id,newName);
    setName('');
    setRename(false);
  }

  function handleChange(e){
    setName(e.target.value);
  }

  //format of different views depending on edit mode

  const viewTemplate=(
        <div className="stack-small">
            <div>
              <label className="restaurant-label" htmlFor={props.id}>
                {props.name}
              </label>
            </div>
            <div className="btn-group">
              <button type="button" className="btn" onClick={()=>setRename(true)}>
                Rename <span className="visually-hidden">{props.name}</span>
              </button>
              <CategorizeButton
              id={props.id} 
              restaurantname={props.name}
              restaurantCat={props.restaurantCat}
              categories={props.categories} 
              toggleChecked={props.toggleChecked}
              />
              <button type="button" className="btn btn__danger" onClick={()=>props.deleteRestaurant(props.id)}>
                Delete <span className="visually-hidden">{props.name}</span>
              </button>
            </div>
          </div>
    );
    
    const renameTemplate=(
      <form className="stack-small" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="restaurant-label" htmlFor={props.id}>
            New name for {props.name}
          </label>
          <input id={props.id} className="restaurant-text" type="text" onChange={handleChange}/>
        </div>
        <div className="btn-group">
          <button type="button" className="btn restaurant-cancel" onClick={()=>setRename(false)}>
            Cancel
            <span className="visually-hidden">renaming {props.name}</span>
          </button>
          <button type="submit" className="btn btn__primary restaurant-edit">
            Save
            <span className="visually-hidden">new name for {props.name}</span>
          </button>
        </div>
      </form>
  );

  return(isRenaming?renameTemplate:viewTemplate);
}
