import ListGroup from 'react-bootstrap/ListGroup';
import ItemTareas from './ItemTareas';
import ModalEditarTarea from './ModalEditarTarea';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { listarTareas } from '../helpers/queries';

const ListaTareas = () => {
    //Logica para manipular modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        obtenerTareas();
    }, [])

    const obtenerTareas = async () => {
        const respuesta = await listarTareas();
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            setTareas(datos);
        }
    }

    return (
        <>
            <ListGroup>
                {tareas.map((itemTareas) => (
                    <ItemTareas key={itemTareas._id} tarea={itemTareas} handleShow={handleShow}></ItemTareas>
                ))}
            </ListGroup>
            <ModalEditarTarea show={show} handleShow={handleShow} handleClose={handleClose} />
        </>
    );
};

export default ListaTareas;