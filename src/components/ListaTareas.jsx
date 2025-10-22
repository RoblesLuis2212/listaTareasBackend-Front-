import ListGroup from 'react-bootstrap/ListGroup';
import ItemTareas from './ItemTareas';
import ModalEditarTarea from './ModalEditarTarea';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { listarTareas, obtenerTareaIDAPI } from '../helpers/queries';

const ListaTareas = () => {
    //Logica para manipular modal
    const [show, setShow] = useState(false);

    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = async (id) => {
        const respuesta = await obtenerTareaIDAPI(id);
        if (respuesta.status === 200) {
            const tareaBuscada = await respuesta.json();
            setTareaSeleccionada(tareaBuscada);
            setShow(true);
        }
        else {
            console.log("Ocurrio un error al obtener la tarea")
        }
    }

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
                    <ItemTareas key={itemTareas._id} tarea={itemTareas} setTareas={setTareas} handleShow={handleShow}></ItemTareas>
                ))}
            </ListGroup>
            <ModalEditarTarea show={show} handleShow={handleShow} tarea={tareaSeleccionada} handleClose={handleClose} />
        </>
    );
};

export default ListaTareas;