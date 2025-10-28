import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { borrarTareaAPI, editarTareaAPI, listarTareas, obtenerTareaIDAPI } from '../helpers/queries';
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

    const finalizarTareas = async () => {
        const tareaActualizada = { ...tarea, estado: true };
        //Llamamos a la funcion para editar la tarea pasandole el id de la misma y la tarea editada
        const respuestaTarea = await editarTareaAPI(tarea._id, tareaActualizada);
        if (respuestaTarea.status === 200) {
            const tareasRes = await listarTareas();
            if (tareasRes.status === 200) {
                const tareasActualizadas = await tareasRes.json();
                setTareas(tareasActualizadas);
            }
            Swal.fire({
                title: "tarea completada!",
                icon: "success",
                draggable: true
            });
        }
    }
    return (
        <ListGroupItem className='d-flex justify-content-between'>
            <span style={{ textDecoration: tarea.estado ? 'line-through' : 'none' }}>
                {tarea.descripcion}
            </span>
            <div>
                {!tarea.estado && (
                    <Button className='btn btn-success' onClick={finalizarTareas}>
                        <i className="bi bi-check-square-fill"></i>
                    </Button>
                )}
                <Button className='btn btn-danger ms-2' onClick={eliminarTarea}>
                    <i className="bi bi-trash-fill"></i>
                </Button>
                {!tarea.estado && (
                    <Button className='btn btn-warning ms-2' onClick={() => handleShow(tarea._id)}>
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                )}
            </div>
        </ListGroupItem>
    );
}


export default ItemTareas;