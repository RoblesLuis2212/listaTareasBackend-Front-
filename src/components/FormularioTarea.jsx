import React, { act, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import ListaTareas from './ListaTareas';
import { agregarTarea, listarTareas } from '../helpers/queries';
import Swal from 'sweetalert2';

const FormularioTarea = () => {
    //validaciones
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const [tareas, setTareas] = useState([]);

    const postValidaciones = async (data) => {
        console.log(data);
        const respuesta = await agregarTarea(data);
        if (respuesta.status === 201) {
            Swal.fire({
                title: "Tarea creada",
                text: `La tarea fue creada exitosamente`,
                icon: "success",
            });
            reset();
        }
        const respuestaTareas = await listarTareas();
        if (respuestaTareas.status === 200) {
            const tareasRestantes = await respuestaTareas.json();
            setTareas(tareasRestantes);
        }
        else {
            console.log("Ocurrio un error al crear la tarea");
        }
    }

    return (
        <>
            <section className='container'>
                <h1 className="text-center mt-2">Lista de Tareas</h1>
                <Form onSubmit={handleSubmit(postValidaciones)}>
                    <Form.Group className="d-flex justify-content-betwen py-2">
                        <Form.Control type="text" placeholder="ingresa una tarea" {...register("descripcion", {
                            required: "Este campo es obligatorio",
                            minLength: {
                                value: 5,
                                message: "la tarea debe contener minimo 5 caracteres"
                            },
                            maxLength: {
                                value: 100,
                                message: "la tarea debe contener maximo 100 "
                            }
                        })} />
                        <Button variant="primary" type="submit" className='ms-1'>
                            agregar
                        </Button>
                    </Form.Group>
                    <Form.Text className="text-danger">
                        {errors.descripcion?.message}
                    </Form.Text>
                </Form>
                <ListaTareas tareas={tareas} setTareas={setTareas}></ListaTareas>
            </section>
        </>
    );
};

export default FormularioTarea;