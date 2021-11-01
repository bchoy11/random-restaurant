import React, {useState} from 'react';
import Categories from './Categories';

export default function Restaurant(props){

  //variables
  const [isRenaming,setRename]=useState(false);
  const [viewCat,setView]=useState(false);
  const [newName, setName]=useState('');

  const categoryList=props.groups.map(group=>{
    const checkmark = props.marked.some(category=>category.id.includes(group.id)); //checks if task includes category in it's own category selection
    return <Categories 
      groupid={group.id}
      groupname={group.name}
      toggleChecked={props.toggleChecked}
      category={props.name}
      categoryid={props.id}
      checked={checkmark}
      key={group.id}
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
