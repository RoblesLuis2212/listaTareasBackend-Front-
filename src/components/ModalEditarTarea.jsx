import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { obtenerTareaIDAPI } from '../helpers/queries';


const ModalEditarTarea = ({ show, handleShow, handleClose, tarea }) => {
    //Validacion del formulario
    const {
        register, handleSubmit, formState: { errors }, reset, setValue
    } = useForm();

    useEffect(() => {
        if (tarea) {
            setValue("descripcion", tarea.descripcion);
        }
    }, [tarea, setValue])

    const postValidaciones = (data) => {
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