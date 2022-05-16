import axios from "axios";
import { url } from "node:inspector";
import React from "react";
import { useState } from "react";
import { Button, FloatingLabel, Form, FormGroup, Modal } from "react-bootstrap";

interface IShopItemModel {
    isShown: boolean,
    handleHide: () => void
}

export interface IFormData {
    name: string,
    price: number,
    count: number,
    image: File | null
}

const ShopItemAddModal: React.FC<IShopItemModel> = (props) => {


    const initialValue: IFormData = {
        name: '',
        price: 0,
        count: 0,
        image: null
    }

    const { isShown, handleHide } = props;

    const [itemFormData, setItemFormData] = useState<IFormData>(initialValue)
    const [isValid, setIsValid] = useState<boolean>(false);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Name', itemFormData.name);
        formData.append('Price', itemFormData.price.toString());
        formData.append('Count', itemFormData.count.toString());
        formData.append('Image', itemFormData.image!)

        axios({
            method: 'POST',
            url: 'https://localhost:7176/api/Shop',
            data: formData,
            headers: {
               'Content-Type':'multipart/form-data'
            }
        })
    }



    const handleInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setItemFormData({ ...itemFormData, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemFormData({
            ...itemFormData,
            image: e.target.files ? e.target.files[0]: null
        });
    }

    return (
        <Modal show={isShown} onHide={handleHide} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новое блюдо</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit} action = 'https://localhost:7176/api/Shop' method = 'POST' encType = 'multipart/form-data'>
                    <FloatingLabel
                        controlId="Name"
                        label="Название"
                        className="mb-3"
                    >
                        <Form.Control
                            value={itemFormData.name}
                            onChange={handleInputField}
                            required
                            type="text"
                            placeholder="Борщ"
                            name='name' />
                    </FloatingLabel>
                    <Form.Group controlId='Image'>
                        <Form.Control
                            name='image'
                            className="mb-3"
                            type="file"
                            size="lg"
                            required
                            accept={'image/png, image/webp'}
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                    <FormGroup>
                        <FloatingLabel controlId="Price" label="Цена" className="mb-3">
                            <Form.Control
                                value={itemFormData.price}
                                name='price'
                                type="number"
                                placeholder="100"
                                onChange={handleInputField}
                            />
                        </FloatingLabel>
                    </FormGroup>
                    <FloatingLabel
                        controlId="Count"
                        label="Количесто"
                        className="mb-3"
                    >
                        <Form.Control
                            value = {itemFormData.count}
                            name='count'
                            type="number"
                            placeholder="10"
                            onChange={handleInputField}
                        />
                    </FloatingLabel>
                    <Button type='submit' variant="primary">
                        Сохранить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default ShopItemAddModal;