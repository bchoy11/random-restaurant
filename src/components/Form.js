import React, {useState} from 'react';
 
function Form(props){
    //variables
    const [namevar,setName] = useState('')
    const [catval,setCat] = useState('')

    //Form functions
    function handleChange(e){
        setName(e.target.value);
    }

    function handleCatChange(e){
        setCat(e.target.value);
    }
    
    function restaurantSubmit(e){
        e.preventDefault();
        (namevar!=='') && props.addRestaurant(namevar); //sends namevar through callback prop to parent (App)
        setName('');
    }

    function categorySubmit(e){
      e.preventDefault();
      (catval!=='') && props.addCategory(catval); //sends namevar through callback prop to parent (App)
      setCat('');
  }
    


    //Form structure (format & building block component combination)
    return(
      <div>
        <form onSubmit={restaurantSubmit}>
          <input
            type="text"
            id="new-restaurant-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            value = {namevar}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn__primary btn__lg">
            Restaurant
          </button>
        </form>
        <form onSubmit={categorySubmit}>
          <input
            type="text"
            id="new-restaurant-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            value = {catval}
            onChange={handleCatChange}
          />
          <button type="submit" className="btn btn__primary btn__lg">
            Category
          </button>
        </form>
      </div>
    );
}

export default Form;