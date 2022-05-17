import React from "react";
import { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import LoginForm from "../../components/login-form/loginForm";
import RegistrationForm from "../../components/regist-form/registrationForm";


export interface IFormProp {
    switch: () => void
}

const LoginPage: React.FC = () => {

    const [isLogin, setIsLogin] = useState<boolean>(true);

    const switchToRegistration = () => setIsLogin(false);
    const switchToLogin = () => setIsLogin(true);

    return (
        <Col className="p-5" md={{ span: 4, offset: 4 }}>
            <h1 className='text-center mb-2'>Заполните данные</h1>
            <Container>
                <FormWrapper>
                    {isLogin
                        ? <LoginForm switch={switchToRegistration} />
                        : <RegistrationForm switch={switchToLogin} />}
                </FormWrapper>
            </Container>
        </Col>
    )
}


export const FormWrapper = styled(Container)`
    padding: 35px;
    border-radius: 16px;
    background: #fafafa;
    box-shadow:  30px 30px 61px #b2b2b2,
             -30px -30px 61px #ffffff;
`;

export default LoginPage;