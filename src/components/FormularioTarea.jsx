import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const FormularioTarea = () => {
    return (
        <section className='container border border-white'>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="ingresa una tarea" />
                    <Form.Text className="text-danger">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </section>
    );
};

export default FormularioTarea;