import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { editarTareaAPI, listarTareas, obtenerTareaIDAPI } from '../helpers/queries';
import Swal from 'sweetalert2';


const ModalEditarTarea = ({ show, handleShow, handleClose, tarea, setTareas }) => {
    //Validacion del formulario
    const {
        register, handleSubmit, formState: { errors }, reset, setValue
    } = useForm();

    useEffect(() => {
        if (tarea) {
            setValue("descripcion", tarea.descripcion);
        }
    }, [tarea, setValue])

    const postValidaciones = async (data) => {
        const respuesta = await editarTareaAPI(tarea._id, data);
        const RestareasRestantes = await listarTareas();
        if (respuesta.status === 200) {
            Swal.fire({
                title: "Tarea Actualizada Exitosamente!",
                icon: "success",
                draggable: true
            });
            const tareasRestantes = await RestareasRestantes.json();
            setTareas(tareasRestantes);
            handleClose();
        }
        else {
            alert("Ocurrio un error al actualizar la tarea")
        }
        console.log(data);
        reset();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h4 className='text-center'>Actualizar Tarea</h4>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(postValidaciones)}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" {...register("descripcion", {
                                required: "Este campo es obligatorio",
                                minLength: {
                                    value: 5,
                                    message: "La descripcion debe contener minimo 5 caracteres."
                                },
                                maxLength: {
                                    value: 100,
                                    message: "La descripcion debe contener maximo 100 caracteres."
                                }
                            }
                            )} placeholder='ingrese aqui su tarea para editar' />
                            <Form.Text className="text-danger">
                                {errors.descripcion?.message}
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Actualizar
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>

    );
};

export default ModalEditarTarea;