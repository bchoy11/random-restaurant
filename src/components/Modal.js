import React, {useState} from 'react';
import Categories from './Categories';
import { Modal, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CategorizeButton(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const categoryList=props.categories.map(overallCat=>{
        const checkmark = props.restaurantCat.some(rCat=>rCat.id.includes(overallCat.id)); //loops through each restaurant and checks if it has the current category in it's own category array
        return <Categories 
          categoryid={overallCat.id}
          categoryname={overallCat.name}
          toggleChecked={props.toggleChecked}
          restaurantid={props.id}
          checked={checkmark}
          key={overallCat.id}
        />
      });

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          categorize
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.restaurantname}'s Categories</Modal.Title>
          </Modal.Header>
          <Modal.Body>{categoryList}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
