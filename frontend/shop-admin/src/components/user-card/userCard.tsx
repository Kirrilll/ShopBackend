import React from "react";
import { Button, Col, Row, ToggleButton } from "react-bootstrap";
import styled, { StyledFunction } from "styled-components";

export interface User {
    id: number,
    name: string,
    surname: string,
    patronymic: string,
    phone: string,
    email: string,
    isAdmin: boolean
}

export interface IUserCardProp{
    user: User,
    setRole: () => void;
}


const UserCard: React.FC<IUserCardProp> = (props) => {

    const {user, setRole} = props;

    const fullName = `${user.surname} ${user.name} ${user.patronymic}`;

    return (
        <UserCardWrapper>
            <Row className = 'align-items-center'>
                <Col sm = {8}>
                    <div>{fullName}</div>
                </Col>
                <Col sm ={4} className='text-end p-2'>
                    <Row>
                        <Col className='text-end'>
                            <RoleText isAdmin={user.isAdmin}>
                                {user.isAdmin ? 'Администратор' : 'Покупатель'}
                            </RoleText>
                        </Col>
                        <Col>
                            <Button onClick = {setRole}>
                                Добавить
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </UserCardWrapper>
    )
}


const UserCardWrapper = styled.div`
    padding: 20px;
    border-radius: 15px;
    background: #f7f7f7;
    box-shadow:  -20px 20px 62px #b4b4b4,
             20px -20px 62px #ffffff;
    width: 100%;
`;

const RoleText = styled.div<{ isAdmin: boolean }>`
    font-size: 16px;
    color: ${props => props.isAdmin ? 'tomato' : 'black'};
`;

export default UserCard;