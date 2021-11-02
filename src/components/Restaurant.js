import React, {useState} from 'react';
import Categories from './Categories';

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

  //Todo item component functions

  function handleSubmit(e){
    e.preventDefault();
    (newName!=='') && props.editTask(props.id,newName);
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
              <label className="todo-label" htmlFor={props.id}>
                {props.name}'s categories:
              </label>
              {categoryList}
            </div>
            <div className="btn-group">
           <button type="button" className="btn todo-cancel" onClick={()=>setView(false)}>
             Close
             <span className="visually-hidden">category change {props.name}</span>
           </button>
            </div>
          </div>
    );

  const viewTemplate=(
        <div className="stack-small">
            <div>
              <label className="todo-label" htmlFor={props.id}>
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
              <button type="button" className="btn btn__danger" onClick={()=>props.deleteTask(props.id)}>
                Delete <span className="visually-hidden">{props.name}</span>
              </button>
            </div>
          </div>
    );
    
    const renameTemplate=(
      <form className="stack-small" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
            New name for {props.name}
          </label>
          <input id={props.id} className="todo-text" type="text" onChange={handleChange}/>
        </div>
        <div className="btn-group">
          <button type="button" className="btn todo-cancel" onClick={()=>setRename(false)}>
            Cancel
            <span className="visually-hidden">renaming {props.name}</span>
          </button>
          <button type="submit" className="btn btn__primary todo-edit">
            Save
            <span className="visually-hidden">new name for {props.name}</span>
          </button>
        </div>
      </form>
  );

  return(isRenaming?renameTemplate:viewCat?viewCategories:viewTemplate);
}
