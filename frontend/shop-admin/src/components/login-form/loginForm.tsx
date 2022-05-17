import React from "react";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { IFormProp } from "../../pages/login-page/loginPage";


const LoginForm: React.FC<IFormProp> = (props) => {
    return (
        <Form>
            <FloatingLabel controlId="floatingInput" label="Номер телефона" className="mb-3" >
                <Form.Control type="text" required placeholder='Иван' />
            </FloatingLabel>
            <FloatingLabel controlId="floatingSurname" label="Париоль" className="mb-3" >
                <Form.Control type="text" required placeholder='Иванов' />
            </FloatingLabel>
            <Row className='gap-5'>
                <Col><Button style = {{width: '100%'}} size = 'lg' type='submit'>Войти</Button></Col>
                <Col><Button style = {{width: '100%'}} size = 'lg' onClick = {props.switch}>Зарегистрироваться</Button></Col>
            </Row>
        </Form>
    )
}

export default LoginForm;