import React, {useState} from 'react';
import './index.css';
import Option from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import {nanoid} from 'nanoid';


function App(props) {

//hooks
    const [restaurants, setRestaurants]=useState(props.tasks); //sets the state of new state "restaurants" to props being passed into function from parent (tasks from index.js)
    const [filter, setFilter]=useState('All');
    const [categories, setCat]=useState(props.groups); // sets state of food categories
    const [filterMap]=useState(props.filterMap);
    const [randomName,setRand]=useState('');


//variables

    const criteria = filter==='All'?()=>true:listitem => listitem.category.some(group=>
      group.name.includes([filter]));

    const taskList=restaurants
    .filter(criteria)
    .map(task=>{
      return <Option
        id={task.id} 
        name={task.name} 
        key={task.id}
        marked={task.category}
        toggleTaskCompleted={toggleTaskCompleted} 
        deleteTask={deleteTask} 
        editTask={editTask} 
        groups={categories}
        toggleChecked={checkbox}
        curFilter={filter}
      />   
    });
      //variable taskList contains list of todos with set properties (id, name, completed, etc)
      //created by filtering the copy of props from parent (tasks) for items with criteria matching selected filter button (using filter object)
      //then mapping through the filtered list

    const tasksNoun = taskList.length!==1?'restaurants':'restaurant';
    
    const headingTask = filter!=='All'?`${taskList.length} ${filter} ${tasksNoun}`:`${taskList.length} Total ${tasksNoun}`;

    const Filter_Name=Object.keys(filterMap);

    const filterList=Filter_Name.map(name=>
      (<FilterButton 
            key={name} 
            name={name} 
            isPressed={name===filter} 
            setFilter={setFilter} 
      />));
      //variable that contains the list of filter button components

    function generateRandom(){
      const filteredRestaurants=restaurants.filter(criteria);
      setRand(filteredRestaurants[Math.floor(Math.random()*filteredRestaurants.length)].name);
    }

//app functions
    
    function addCategory(name){
      const newCategory = {id:'group-'+nanoid(), name: name};
      filterMap[name]=null;
      setCat([...categories,newCategory]);
    }

    //function addTask used as callback prop
    function addTask(name){
      const newTask = {id:'restaurant-'+nanoid(), name: name, completed: false, category:[]};
      setRestaurants([...restaurants,newTask]);
    }
    

    function deleteTask(id){
      const updatedTasks=restaurants.filter(task=>
        task.id!==id
      );
      setRestaurants(updatedTasks);
    }

    function editTask(id, newName){
      const editedTask=restaurants.map(task=>{
        if(id===task.id){
          return {...task, name: newName}
        }
        return task;
      });
      setRestaurants(editedTask);
    }

    //checks restaurant for selected category, if category exists in list then remove, if not then add into category list
    //updates tasks with selected or removed categories
    function checkbox(groupid, group, taskid){
      const addGroup={id: groupid, name: group};
      const categorize = restaurants.map(task=>{
        if(taskid===task.id){
          let labeled=false;
          task.category.map(cat=>{
            if(cat.id===groupid){
              task.category.splice(task.category.indexOf(cat),1);
              labeled=true;
            }
            return labeled;
          });
          if(labeled===false){
            task.category.push(addGroup);
            return {...task}
          }
        }  
          return task;  
      });
      setRestaurants(categorize);
    }

    function toggleTaskCompleted(id){
      const updatedTasks=restaurants.map(task=>{
        if(id===task.id){
          return {...task,completed: !task.completed}
        }
        return task;
      });
      setRestaurants(updatedTasks);
    }

//App format structure (format & building block component combination)
    
    return (
      <div className="todoapp stack-large">
        <h1>Generator</h1>
        <div>
          <button className="btn" onClick={generateRandom}>Random</button>
          <h2 className="label-wrapper label__lg">{randomName}</h2>
        </div>
        <Form addTask={addTask} addCategory={addCategory} />
        <div className="filters btn-group stack-exception">
          {filterList}
        </div>
        <h2 id="list-heading">
          {headingTask}
        </h2>
        <ul
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList} {/*variable made up of Todo item components*/}
        </ul>
      </div>
    );
  }

export default App;

