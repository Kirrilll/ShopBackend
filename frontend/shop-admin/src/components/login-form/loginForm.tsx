import axios from "axios";
import React, { FormEvent, useState } from "react";
import { Button, Col, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RequestState } from "../../enums/requestState";
import { IFormProp } from "../../pages/login-page/loginPage";


interface ILoginForm {
    phone: string,
    password: string
}

const LoginForm: React.FC<IFormProp> = (props) => {

    const initialValue: ILoginForm = {
        phone: '',
        password: ''
    };

    const navigate = useNavigate();
    const [requestState, setRequestState] = useState<RequestState>(RequestState.IDLE);
    const [validated, setValidated] = useState<boolean>(false);
    const [lofingFrom, setLoginForm] = useState<ILoginForm>(initialValue)


    const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setLoginForm({
            ...lofingFrom,
            [name]: value
        });
    }

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            setRequestState(RequestState.LOADING);
            axios.post(
                'https://localhost:7176/api/User/authorize',
                lofingFrom
            ).then(
                res => {
                    if (res.status == 200) {
                        setRequestState(RequestState.SUCCESSFULL);
                        //Записываю user в глобальные данные
                        navigate('/admin');
                        const user = res.data;
                        console.log(user);
                    }
                    else {
                        setLoginForm({...lofingFrom, password: ''});
                        setRequestState(RequestState.ERROR)
                    }
                }
            ).catch(e => {
                setRequestState(RequestState.ERROR);
                setLoginForm({...lofingFrom, password: ''});
            });
        }
        setValidated(true);
    }

    return (
        <Form noValidate validated={validated} onSubmit={submit}>
            {requestState == RequestState.ERROR
                ? <div style={{ color: 'tomato', fontWeight: 'bold' }} className='mb-3 text-center'>Неправильный номер, либо пароль</div>
                : null
            }
            <FloatingLabel controlId="floatingInput" label="Номер телефона" className="mb-3" >
                <Form.Control
                    disabled={requestState == RequestState.LOADING}
                    name='phone'
                    onChange={handleInputField}
                    value={lofingFrom.phone}
                    type="text"
                    required
                    placeholder='Иван' />
                <Form.Control.Feedback type="invalid">
                    Это поле обязательно для заполнения
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingSurname" label="Париоль" className="mb-3" >
                <Form.Control
                    disabled={requestState == RequestState.LOADING}
                    name='password'
                    onChange={handleInputField}
                    value={lofingFrom.password}
                    type="password"
                    required
                    placeholder='Иванов' />
                <Form.Control.Feedback type="invalid">
                    Это поле обязательно для заполнения
                </Form.Control.Feedback>
            </FloatingLabel>
            <Row className='gap-5'>
                <Col>
                    <Button style={{ width: '100%' }} size='lg' type='submit' disabled={requestState == RequestState.LOADING}>
                        {requestState == RequestState.LOADING
                            ? <Spinner size='sm' animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            : 'Войти'}
                    </Button>
                </Col>
                <Col>
                    <Button style={{ width: '100%' }} size='lg' onClick={props.switch} disabled={requestState == RequestState.LOADING}>Зарегистрироваться</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default LoginForm;