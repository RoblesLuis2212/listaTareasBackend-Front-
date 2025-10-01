import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';


const FormularioTarea = () => {
    //validaciones
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const postValidaciones = (data) => {
        data.id = crypto.randomUUID();
        console.log(data);
        reset();
    }

    return (
        <section className='container border border-white'>
            <Form onSubmit={handleSubmit(postValidaciones)}>
                <Form.Group className="d-flex justify-content-betwen py-2">
                    <Form.Control type="text" placeholder="ingresa una tarea" {...register("tarea", {
                        required: "Este campo es obligatorio",
                        minLength: {
                            value: 10,
                            message: "la tarea debe contener minimo 10 caracteres"
                        },
                        maxLength: {
                            value: 60,
                            message: "la tarea debe contener maximo 60 "
                        }
                    })} />
                    <Button variant="primary" type="submit" className='ms-1'>
                        agregar
                    </Button>
                </Form.Group>
                <Form.Text className="text-danger">
                    {errors.tarea?.message}
                </Form.Text>
            </Form>
        </section>
    );
};

export default FormularioTarea;