import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//variable of dataset containing tasklist passed through to child
const Data=[
    {id: 'restaurant-1', 
    name:'Tofu', 
    completed: false, 
    category:[],
    },

    {id: 'restaurant-2', 
    name:'Qin', 
    completed: false, 
    category:[],
    },
    
    {id: 'restaurant-3', 
    name:'Pho', 
    completed: false, 
    category:[],
    }
]

const Categories=[
    {id: 'group-1', 
    name:'Korean', 
    },

    {id: 'group-2', 
    name:'Taiwanese',  
    },

    {id: 'group-3', 
    name:'Vietnamese',  
    },

    {id: 'group-4', 
    name:'Chinese', 
    },

    {id: 'group-5', 
    name:'Japanese',  
    },

    {id: 'group-6', 
    name:'Italian',  
    },
]

const Map={
  All: null,
  Korean: null,
  Taiwanese: null,
  Vietnamese: null,
  Chinese: null,
  Japanese: null,
  Italian: null,
}

ReactDOM.render(<App tasks={Data} groups={Categories} filterMap={Map}/>,document.getElementById('root'));