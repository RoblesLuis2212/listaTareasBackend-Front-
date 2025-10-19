import ListGroup from 'react-bootstrap/ListGroup';
import ItemTareas from './ItemTareas';
import ModalEditarTarea from './ModalEditarTarea';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ListaTareas = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <ListGroup>
                <ItemTareas tarea="tengo que ir a comprar pan" handleShow={handleShow}></ItemTareas>
            </ListGroup>
            <ModalEditarTarea show={show} handleShow={handleShow} handleClose={handleClose} />
        </>
    );
};

export default ListaTareas;