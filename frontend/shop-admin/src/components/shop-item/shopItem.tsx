import React from "react";
import { useState } from "react";
import { ShopItemState } from "../../enums/shopItemState";
import { Container, Row, Spinner, Col, Card, CloseButton, Button, Image, FormControl } from "react-bootstrap";
import styled from 'styled-components'
import EDIT_ICON from '../../icons/edit.png'
import DELETE_ICON from '../../icons/delete.png'
import DONE_ICON from '../../icons/done.png'
import CLOSE_ICON from '../../icons/close.webp'
import axios from "axios";
import useData from "../../hooks/useData";
import { IFormData } from "../shop-item-add-modal/shopItemAddModal";

export interface IShopItem {
    id: number,
    name: string,
    price: number,
    count: number,
    imagePath: string
}

const apiPath: string = 'https://localhost:7176/'

const ShopItem: React.FC<IShopItem> = (props) => {

    //const [itemState, setItemState] = useState(ShopItemState.DEFAULT);

    const initialValue: IFormData = {
        name: props.name,
        price: props.price,
        count: props.count,
        image: null
    };

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [item, setItem] = useState<IShopItem>({ ...props });

    const [postData, setPostData] = useState<IFormData>(initialValue);

    const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostData({
            ...postData,
            image: e.target.files ? e.target.files[0] : null
        });
    }


    const deleteItem = () => {
        axios.delete(`https://localhost:7176/api/Shop/${props.id}`);
    }

    const save = () => {
        const formData = new FormData();
        formData.append('Name', postData.name);
        formData.append('Price', postData.price.toString());
        formData.append('Count', postData.count.toString());
        formData.append('Image', postData.image!);
        
        axios({
            method: 'PUT',
            url: `https://localhost:7176/api/Shop/${props.id}`,
            data: formData,
            headers: {
               'Content-Type':'multipart/form-data'
            }
        })
    }
    const handleSave = () => {
        save();
        setIsEdit(false)
    }

    const handleClose = () => {
        setPostData(initialValue);
        setIsEdit(false);
    }

    return (
        <CustomCard border='dark' style={{ width: '18rem' }}>
            <Card.Header className='d-flex justify-content-between'>
                {
                    isEdit
                        ? <FormControl name = 'name' type='text' value={postData.name} onChange={handleInputField} />
                        : <Card.Title>{props.name}</Card.Title>
                }

                <Row className='d-flex align-items-center justify-content-between flex-nowrap'>
                    {
                        isEdit
                            ? < Row className='d-flex justify-content-around align-items-center'>
                                <IconButton onClick={handleSave}>
                                    <Image width='100%' src={DONE_ICON}></Image>
                                </IconButton>
                                <IconButton onClick={handleClose}>
                                    <Image width='100%' src={CLOSE_ICON}></Image>
                                </IconButton>
                            </Row>
                            : <IconButton onClick={() => setIsEdit(true)}>
                                <Image width='100%' src={EDIT_ICON}></Image>
                            </IconButton>
                    }
                    <IconButton onClick={deleteItem}>
                        <Image width='100%' src={DELETE_ICON}></Image>
                    </IconButton>
                </Row>

            </Card.Header>
            <Card.Img width={'100%'} variant="top" src={'https://localhost:7176/' + props.imagePath} />
            <Card.Body>
                {
                    isEdit
                        ? <>
                            <FormControl
                                name='image'
                                className="mb-3"
                                type="file"
                                size="sm"
                                required
                                accept={'image/png, image/webp'}
                                onChange={handleImageChange}
                            />
                            <FormControl name = 'price' type='number' value={postData.price} onChange={handleInputField} />
                            <FormControl name = 'count' type='number' value={postData.count} onChange={handleInputField} />
                        </>
                        : <>
                            <Card.Text>{`${props.price} руб.`}</Card.Text>
                            <Card.Text>{`${props.count} шт.`}</Card.Text>
                        </>
                }
            </Card.Body>
        </CustomCard>
    )
}

const CustomCard = styled(Card)`
    &&{
        border-radius: 15px;
        background-color: #c5c5c7;
    }
`;

const IconButton = styled(Button)`
    &&{
        width: 40px;
        height: 40px;
        border-radius: 100%;
        padding: 0;
        background-color: transparent;
        border: none;
    }
`;


export default ShopItem