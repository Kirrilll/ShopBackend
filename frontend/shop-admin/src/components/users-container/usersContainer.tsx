import axios from "axios";
import React from "react";
import { Spinner, Stack } from "react-bootstrap";
import { DataState } from "../../enums/dataState";
import useData from "../../hooks/useData";
import UserCard, { User } from "../user-card/userCard";

const UsersContainer: React.FC = () => {


    const { dataState, data, dataHandler } = useData<User>(
        () => axios.get('https://localhost:7176/api/User')
    );

    const setRole = (id: number, isAdmin: boolean) => {
        return async () => {
            var res = await axios.put(`https://localhost:7176/api/User/${id}/${isAdmin}`);
            console.log(res);
            if(res.status == 200){
                let updatedData = data.map(user => {
                    if(user.id == id) user.isAdmin = isAdmin;
                    return user;
                });
                dataHandler(updatedData);
            }
            //Здесь либо довавить в data, либо refresh в БД
        } 
    }

    return (
        <Stack className = 'p-5 gap-4'>
            {
                dataState == DataState.NOT_LOADED
                    ? <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    : data.map(user => <UserCard key = {user.id} user = {user} setRole = {setRole(user.id, !user.isAdmin)}></UserCard>)
            }

        </Stack>
    )
}

export default UsersContainer;