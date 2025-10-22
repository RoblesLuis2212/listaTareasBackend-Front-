import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { borrarTareaAPI, listarTareas, obtenerTareaIDAPI } from '../helpers/queries';
import Swal from 'sweetalert2';

const ItemTareas = ({ tarea, handleShow, setTareas }) => {
    const eliminarTarea = () => {
        console.log("Desde funcion eliminar tarea!");
        Swal.fire({
            title: "¿Estas Seguro?",
            text: `Vas a eliminar la tarea "${tarea.descripcion}". esta accion no se puede deshacer`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const respuesta = await borrarTareaAPI(tarea._id);
                if (respuesta.status === 200) {
                    Swal.fire({
                        title: "Eliminado",
                        text: "La tarea fue eliminada exitosamente",
                        icon: "success",
                        timer: 2000
                    });
                    const respuestaTareas = await listarTareas();
                    if (respuestaTareas.status === 200) {
                        const tareasRestantes = await respuestaTareas.json();
                        setTareas(tareasRestantes);
                    }
                } else {
                    alert("Ocurrio un error al eliminar la tarea");
                }
            }
        })
    }
    return (
        <ListGroupItem className='d-flex justify-content-between'>
            {tarea.descripcion}
            <div>
                <Button className='btn btn-success'>
                    <i className="bi bi-check-square-fill"></i>
                </Button>
                <Button className='btn btn-danger ms-2' onClick={eliminarTarea}>
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