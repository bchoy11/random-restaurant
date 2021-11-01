import React, {useState} from 'react';
import './index.css';
import Restaurant from './components/Restaurant';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import {nanoid} from 'nanoid';


function App(props) {

//hooks
    const [restaurantList, setRestaurants]=useState(props.restaurantList); //sets the state of new state "restaurants" to props being passed into function from parent (Data from index.js)
    const [filter, setFilter]=useState('All'); //sets the current state of the filter based on selection
    const [categories, setCat]=useState(props.groups); // sets state of food categories for filtering
    const [filterMap]=useState(props.filterMap); //lists all the available filter options
    const [randomName,setRand]=useState('');


//variables

    const criteria = filter==='All'?()=>true:currentRestaurant => currentRestaurant.category.some(currentCategory=>
      currentCategory.name.includes([filter])); //filter the list with restaurant objects that have a category object with the same name property that matches the filter

    const filteredRestaurantList=restaurantList
    .filter(criteria)
    .map(currentRestaurant=>{
      return <Restaurant
        id={currentRestaurant.id} 
        name={currentRestaurant.name} 
        key={currentRestaurant.id}
        marked={currentRestaurant.category}
        deleteRestaurant={deleteRestaurant} 
        editTask={editRestaurant} 
        groups={categories}
        toggleChecked={checkbox}
        curFilter={filter}
      />   
    });
      //variable taskList contains list of todos with set properties (id, name, completed, etc)
      //created by filtering the copy of props from parent (tasks) for items with criteria matching selected filter button (using filter object)
      //then mapping through the filtered list

    const plurality = filteredRestaurantList.length!==1?'restaurants':'restaurant';
    
    const headingTask = filter!=='All'?`${filteredRestaurantList.length} ${filter} ${plurality}`:`${filteredRestaurantList.length} Total ${plurality}`;

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
      const filteredRestaurants=restaurantList.filter(criteria);
      setRand(filteredRestaurants[Math.floor(Math.random()*filteredRestaurants.length)].name);
    }

//app functions
    
    function addCategory(name){
      const newCategory = {id:'group-'+nanoid(), name: name};
      filterMap[name]=null;
      setCat([...categories,newCategory]);
    }

    //function addRestaurant used as callback prop
    function addRestaurant(name){
      const newRestaurant = {id:'restaurant-'+nanoid(), name: name, category:[]};
      setRestaurants([...restaurantList,newRestaurant]);
    }
    
    function deleteRestaurant(id){
      const updatedRestaurant=restaurantList.filter(currentRestaurant=>
        currentRestaurant.id!==id
      );
      setRestaurants(updatedRestaurant);
    }

    function editRestaurant(id, newName){
      const editedRestaurant=restaurantList.map(currentRestaurant=>{
        if(id===currentRestaurant.id){
          return {...currentRestaurant, name: newName}
        }
        return currentRestaurant;
      });
      setRestaurants(editedRestaurant);
    }

    //checks restaurant for selected category, if category exists in list then remove, if not then add into category list
    //updates restaurant with selected or removed categories
    function checkbox(categoryid, group, restaurantID){
      const addGroup={id: categoryid, name: group};
      const categorize = restaurantList.map(currentRestaurant=>{
        if(restaurantID===currentRestaurant.id){
          let labeled=false;
          currentRestaurant.category.map(currentCategory=>{
            if(currentCategory.id===categoryid){
              currentRestaurant.category.splice(currentRestaurant.category.indexOf(currentCategory),1);
              labeled=true;
            }
            return labeled;
          });
          if(labeled===false){
            currentRestaurant.category.push(addGroup);
            return {...currentRestaurant}
          }
        }  
          return currentRestaurant;  
      });
      setRestaurants(categorize);
    }

//App format structure (format & building block component combination)
    
    return (
      <div className="todoapp stack-large">
        <h1>Generator</h1>
        <div>
          <button className="btn" onClick={generateRandom}>Random</button>
          <h2 className="label-wrapper label__lg">{randomName}</h2>
        </div>
        <Form addTask={addRestaurant} addCategory={addCategory} />
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
          {filteredRestaurantList} {/*variable made up of Todo item components*/}
        </ul>
      </div>
    );
  }

export default App;

