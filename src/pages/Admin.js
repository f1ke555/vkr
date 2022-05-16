import React, { useState } from "react";
import {Button, Container, Form} from "react-bootstrap";
import {apiTransport} from "../transport/api.transport";
import mail_outline from "../assets/mail_outline.png";
import vpn_key from "../assets/vpn_key.png";

const DEFAULT_STATE = {
    mainData: {
        category: '',
        description: '',
        name: '',
        views: 0,
    }
}

const CATEGORY_STATE = {
    name: '',
}

const Admin = () => {

    const [state, setState] = useState(DEFAULT_STATE);
    const [category, setCategory] = useState(CATEGORY_STATE)
    const handleAddGameClick = async () => {
        await apiTransport.addgame(category)
            .then((response) => console.log(response))
            .catch((e) => console.log(e));
    };

    const handleAddCategoryClick = async () => {
        await apiTransport.addcategory(category)
            .then((response) => console.log(response))
            .catch((e) => console.log(e));
    };



    const handleName = (e) => {
        setState((prevValue) => ({ ...prevValue, name: e.target.value }));
    }

    const handleDescription = (e) => {
        setState((prevValue) => ({ ...prevValue, description: e.target.value }));
    }

    const handleCategory = (e) => {
        setState((prevValue) => ({ ...prevValue, category: e.target.value }));
    }

    const handleViews = (e) => {
        setState((prevValue) => ({ ...prevValue, views: e.target.value }));
    }

    const handleNameCategory = (e) => {
        setCategory((prevValue) => ({ ...prevValue, name: e.target.value }));
    }

    return (
        <Container className="d-flex flex-column">
            <h2 className="pt-3">Добавить игру</h2>
                <Form className="d-flex flex-column pt-1">
                    <Form.Control
                        placeholder="Введите имя игры"
                        value={state.name}
                        onChange={handleName}
                    />
                    <Form.Control
                        placeholder="Введите описание игры"
                        value={state.description}
                        onChange={handleDescription}
                    />
                    <Form.Control
                        placeholder="Введите категорию игры"
                        value={state.category}
                        onChange={handleCategory}
                    />
                    <Form.Control
                        placeholder="Введите просмотры"
                        value={state.views}
                        onChange={handleViews}
                    />
                    <Button className="mt-4" variant="primary"
                    onClick={handleAddGameClick()}
                    >
                        Добавить
                    </Button>
            </Form>
            <h2 className="pt-5">Добавить категорию</h2>
            <Form>
                <Form.Control
                    placeholder="Введите категорию"
                    value={category.name}
                    onChange={handleNameCategory}
                />
                <Button className="mt-4" variant="primary"
                        onClick={handleAddCategoryClick}
                >
                    Добавить
                </Button>
            </Form>
        </Container>
    );
};

export default Admin;
