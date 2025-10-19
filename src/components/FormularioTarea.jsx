import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import ListaTareas from './ListaTareas';


const FormularioTarea = () => {
    //validaciones
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const postValidaciones = (data) => {
        console.log(data);
        reset();
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
                <ListaTareas></ListaTareas>
            </section>
        </>
    );
};

export default FormularioTarea;