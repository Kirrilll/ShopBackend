import axios from 'axios';
import React, { FormEvent, useState } from 'react'
import { useEffect } from 'react';
import { Button, Col, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap'
import { DataState } from '../../enums/dataState';
import { RequestState } from '../../enums/requestState';
import { RegistrationValidator } from '../../helpers/registrationValidator';
import { IFormProp } from '../../pages/login-page/loginPage';

export interface IRegistrationForm {
    name: string,
    surname: string,
    patronymic: string,
    phone: string,
    email: string,
    password: string,
    confimPassword: string
}

const RegistrationForm: React.FC<IFormProp> = (props) => {

    const initialValue: IRegistrationForm = {
        name: '',
        surname: '',
        patronymic: '',
        phone: '',
        email: '',
        password: '',
        confimPassword: ''
    }

    const [requestState, setRequestState] = useState<RequestState>(RequestState.IDLE)

    const [regFormData, setRegFormData] = useState<IRegistrationForm>(initialValue);

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (RegistrationValidator.validate(regFormData)) {
            setRequestState(RequestState.LOADING);
            axios.post(
                'https://localhost:7176/api/User/register',
                {
                    name: regFormData.name,
                    surname: regFormData.surname,
                    patronymic: regFormData.patronymic,
                    phone: regFormData.phone,
                    email: regFormData.email,
                    password: regFormData.password
                }
            ).then(res => {
                //Перенаправить на страницу магазина
                if (res.status == 200) {
                    let user = res.data;
                    console.log(user)
                    setRequestState(RequestState.SUCCESSFULL);
                }
                else {
                    setRequestState(RequestState.ERROR)
                }

            }).catch(e => setRequestState(RequestState.ERROR))
        }
    }

    const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setRegFormData({
            ...regFormData,
            [name]: value
        });
    }


    useEffect(() => {
        if (requestState != RequestState.IDLE)
            setRequestState(RequestState.IDLE)
    }, [regFormData])


    return (
        <Form noValidate validated={false} onSubmit={submit}>
            <FloatingLabel controlId="floatingInput" label="Имя" className="mb-3" >
                <Form.Control
                    disabled={requestState === RequestState.LOADING}
                    onChange={handleInputField}
                    value={regFormData.name}
                    type="text"
                    isValid={RegistrationValidator.isValidName(regFormData.name)}
                    isInvalid={!RegistrationValidator.isValidName(regFormData.name)}
                    placeholder='Иван'
                    name='name' />
                <Form.Control.Feedback type="invalid">
                    Это поле обязательно для заполнения
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingSurname" label="Фамилия" className="mb-3" >
                <Form.Control
                    disabled={requestState === RequestState.LOADING}
                    value={regFormData.surname}
                    name='surname'
                    isValid={RegistrationValidator.isValidSurname(regFormData.surname)}
                    isInvalid={!RegistrationValidator.isValidSurname(regFormData.surname)}
                    onChange={handleInputField}
                    type="text"
                    required
                    placeholder='Иванов'
                />
                <Form.Control.Feedback type="invalid">
                    Это поле обязательно для заполнения
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPatr" label="Отчество" className="mb-3" >
                <Form.Control
                    disabled={requestState === RequestState.LOADING}
                    type="text"
                    required
                    placeholder='Петрович'
                    isValid={RegistrationValidator.isValidPatronymic(regFormData.patronymic)}
                    isInvalid={!RegistrationValidator.isValidPatronymic(regFormData.patronymic)}
                    value={regFormData.patronymic}
                    name='patronymic'
                    onChange={handleInputField} />
                <Form.Control.Feedback type="invalid">
                    Это поле обязательно для заполнения
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPhone" label="Номер телефона" className="mb-3" >
                <Form.Control
                    disabled={requestState === RequestState.LOADING}
                    type="phone"
                    required
                    isValid={RegistrationValidator.isValidPhone(regFormData.phone)}
                    isInvalid={!RegistrationValidator.isValidPhone(regFormData.phone)}
                    placeholder="89747084512"
                    value={regFormData.phone}
                    name='phone'
                    onChange={handleInputField} />
                <Form.Control.Feedback type="invalid">
                    Номер должен быть в формате +7-xxx-xxx-xx-xx
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingEmail" label="Почта" className="mb-3" >
                <Form.Control
                    disabled={requestState === RequestState.LOADING}
                    type="email"
                    required
                    placeholder="email"
                    value={regFormData.email}
                    name='email'
                    isInvalid={!RegistrationValidator.isValidEmail(regFormData.email)}
                    isValid={RegistrationValidator.isValidEmail(regFormData.email)}
                    onChange={handleInputField} />
                <Form.Control.Feedback type="invalid">
                    Email должен быть в формате mail@mail.ru
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Пароль" className="mb-3">
                <Form.Control
                    disabled={requestState === RequestState.LOADING}
                    type="password"
                    placeholder="Password"
                    required
                    value={regFormData.password}
                    name='password'
                    isValid={RegistrationValidator.isValidPassword(regFormData.password)}
                    isInvalid={!RegistrationValidator.isValidPassword(regFormData.password)}
                    onChange={handleInputField} />
                <Form.Control.Feedback type="invalid">
                    Пароль олжен содержать больше 5 символов
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingPasswordRepeat" label="Подтверждние пароля" className="mb-3">
                <Form.Control
                    disabled={requestState === RequestState.LOADING}
                    type="password"
                    placeholder="Password"
                    required
                    value={regFormData.confimPassword}
                    name='confimPassword'
                    isValid={RegistrationValidator.isValidConfimPaswword(regFormData.password, regFormData.confimPassword)}
                    isInvalid={!RegistrationValidator.isValidConfimPaswword(regFormData.password, regFormData.confimPassword)}
                    onChange={handleInputField} />
                <Form.Control.Feedback type="invalid">
                    Пароли должны совпадать
                </Form.Control.Feedback>
            </FloatingLabel>
            {requestState === RequestState.ERROR ? <div style={{ color: 'tomato', fontSize: '16px', fontWeight: 'bold' }} className='text-center mb-2 '>Пользователь с таким номером телефона уже существует</div> : null}
            <Row className='gap-5'>
                <Col>
                    <Button
                        size='lg'
                        style={{ width: '100%' }}
                        type='submit'
                        disabled={requestState === RequestState.LOADING}
                    >
                        {requestState === RequestState.LOADING
                            ? <Spinner size='sm' animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            : 'Зарегестрироваться'}
                    </Button>
                </Col>
                <Col>
                    <Button size='lg' style={{ width: '100%' }} onClick={props.switch} disabled={requestState === RequestState.LOADING}>Войти</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default RegistrationForm;