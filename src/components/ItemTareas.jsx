import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

const ItemTareas = ({ tarea, handleShow }) => {
    return (
        <ListGroupItem className='d-flex justify-content-between'>
            {tarea}
            <div>
                <Button className='btn btn-success'>
                    <i className="bi bi-check-square-fill"></i>
                </Button>
                <Button className='btn btn-danger ms-2'>
                    <i className="bi bi-trash-fill"></i>
                </Button>
                <Button className='btn btn-warning ms-2' onClick={() => handleShow()}>
                    <i className="bi bi-pencil-square"></i>
                </Button>
            </div>
        </ListGroupItem>
    );
};

export default ItemTareas;