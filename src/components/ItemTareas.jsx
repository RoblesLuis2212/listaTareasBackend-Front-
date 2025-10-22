import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { obtenerTareaIDAPI } from '../helpers/queries';

const ItemTareas = ({ tarea, handleShow, setTareas }) => {
    return (
        <ListGroupItem className='d-flex justify-content-between'>
            {tarea.descripcion}
            <div>
                <Button className='btn btn-success'>
                    <i className="bi bi-check-square-fill"></i>
                </Button>
                <Button className='btn btn-danger ms-2'>
                    <i className="bi bi-trash-fill"></i>
                </Button>
                <Button className='btn btn-warning ms-2' onClick={() => handleShow(tarea._id)}>
                    <i className="bi bi-pencil-square"></i>
                </Button>
            </div>
        </ListGroupItem>
    );
};

export default ItemTareas;