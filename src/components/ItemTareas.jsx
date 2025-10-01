import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const ItemTareas = ({ tarea }) => {
    return (
        <ListGroupItem>
            {tarea}
        </ListGroupItem>
    );
};

export default ItemTareas;