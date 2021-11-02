import React, {useState} from 'react';
import Categories from './Categories';
import { Modal, ModalBody } from 'react-bootstrap';


export default function Restaurant(props){

  //variables
  const [isRenaming,setRename]=useState(false);
  const [viewCat,setView]=useState(false);
  const [newName, setName]=useState('');

  const categoryList=props.categories.map(overallCat=>{
    const checkmark = props.restaurantCat.some(rCat=>rCat.id.includes(overallCat.id)); //loops through each restaurant and checks if it has the current category in it's own category array
    return <Categories 
      categoryid={overallCat.id}
      categoryname={overallCat.name}
      toggleChecked={props.toggleChecked}
      category={props.name}
      restaurantid={props.id}
      checked={checkmark}
      key={overallCat.id}
    />
  });

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
   
      const viewCategories=( 
        <div className="stack-small">
          <div>
            <label className="restaurant-label" htmlFor={props.id}>
              {props.name}'s categories:
            </label>
            {categoryList}
          </div>
          <div className="btn-group">
          <button type="button" className="btn restaurant-cancel" onClick={()=>setView(false)}>
            Close
            <span className="visually-hidden">category change {props.name}</span>
          </button>
          </div>
        </div>
    );

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
              <button type="button" className="btn" onClick={()=>setView(true)}>
                Categorize
              </button>
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

  return(isRenaming?renameTemplate:viewCat?viewCategories:viewTemplate);
}
