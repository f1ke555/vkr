import React, {useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {apiTransport} from "../transport/api.transport";
import mail_outline from "../assets/mail_outline.png";
import vpn_key from "../assets/vpn_key.png";
import BasicTable from "../components/BasicTable"

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

const COMPETENCY_STATE = {
    name: '',
}

const COMPETENCY_GAME_STATE = {
    competency: '',
    game: '',
}

const Admin = () => {

    const [state, setState] = useState(DEFAULT_STATE);
    const [category, setCategory] = useState(CATEGORY_STATE)
    const [competency, setCompetency] = useState(COMPETENCY_STATE)
    const [competencyFromGame, setCompetencyFromGame] = useState(COMPETENCY_GAME_STATE)
    const [metrics, setMetrics] = useState([])
    const handleAddGameClick = async () => {
        await apiTransport.addgame(state)
            .then((response) => console.log(response))
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        apiTransport.loadMetrics('combinatorics')
            .then((response) => setMetrics(response.data))
    }, [])

    const getMappedMetrics = () => {
        metrics.map((item) => {
            return item.game
        })
    }

    const handleAddCategoryClick = async () => {
        await apiTransport.addcategory(category)
            .then((response) => console.log(response))
            .catch((e) => console.log(e));
    };

    const handleAddCompetencyClick = async () => {
        await apiTransport.addcompetency(competency)
            .then((response) => console.log(response))
            .catch((e) => console.log(e));
    };

    const handleAddCompetencyFromGame = async () => {
        await apiTransport.addCompetencyFromGame(competencyFromGame)
            .then((response) => console.log(response))
            .catch((e) => console.log(e));
    };

    const handleCompetencyFromGame = (e) => {
        setCompetencyFromGame((prevValue) => ({ ...prevValue, competency: e.target.value }));
    }

    const handlGameCompetency = (e) => {
        setCompetencyFromGame((prevValue) => ({ ...prevValue, game: e.target.value }));
    }

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

    const handleCompetency = (e) => {
        setCompetency((prevValue) => ({ ...prevValue, name: e.target.value }));
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
                    onClick={handleAddGameClick}
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
            <h2 className="pt-5">Добавить компетенцию</h2>
            <Form>
                <Form.Control
                    placeholder="Введите компетенцию"
                    value={competency.name}
                    onChange={handleCompetency}
                />
                <Button className="mt-4" variant="primary"
                        onClick={handleAddCompetencyClick}
                >
                    Добавить
                </Button>
            </Form>
            <h2 className="pt-3">Добавить игру</h2>
            <Form>
                <Form.Control
                    placeholder="Введите компетенцию"
                    value={competencyFromGame.competency}
                    onChange={handleCompetencyFromGame}
                />
                <Form.Control
                    placeholder="Введите название игры"
                    value={competencyFromGame.game}
                    onChange={handlGameCompetency}
                />
                <Button className="mt-4" variant="primary"
                        onClick={handleAddCompetencyFromGame}
                >
                    Добавить
                </Button>
            </Form>
            <BasicTable metrics={metrics}/>
        </Container>
    );
};

export default Admin;
