import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

interface IShopItemModel {
    isShown: boolean,
    handleHide: () => void
}

const ShopItemAddModal: React.FC<IShopItemModel> = (props) => {

    const {isShown, handleHide} = props;

    return (
        <Modal show={isShown} onHide={handleHide} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleHide}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ShopItemAddModal;