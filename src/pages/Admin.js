import React, {useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {apiTransport} from "../transport/api.transport";
import mail_outline from "../assets/mail_outline.png";
import vpn_key from "../assets/vpn_key.png";
import BasicTable from "../components/BasicTable"
import {Modal, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {style} from "@mui/system";
import adminModal from "../assets/adminModal.svg"

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
    const [open, setOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState(false);
    const [openCompetency, setOpenCompetency] = useState(false);
    const [openCompetencyFromGame, setOpenCompetencyFromGame] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenCategory = () => setOpenCategory(true);
    const handleCloseCategory = () => setOpenCategory(false);

    const handleOpenCompetency = () => setOpenCompetency(true);
    const handleCloseCompetency = () => setOpenCompetency(false);

    const handleOpenCompetencyFromGame = () => setOpenCompetencyFromGame(true);
    const handleCloseCompetencyFromGame = () => setOpenCompetencyFromGame(false);

    const handleAddGameClick = async () => {
        await apiTransport.addgame(state)
            .then((response) => console.log(response))
            .catch((e) => console.log(e));
        setOpen(false)
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
        setOpen(false)
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
        setOpen(false)
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

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#4B185F',
        border: '8px',
        p: 4,
        boxShadow: '0px 4px 11px 1px rgba(0, 0, 0, 0.13)',
        borderRadius: '8px',
    };

    return (
        <Container className="d-flex flex-column">
            <h1 className="mt-4 d-flex justify-content-center">Панель <span style={{paddingLeft: '10px'}} className="color-text">администратора</span></h1>
            <div className='d-flex'>
                <div style={{width: '50%'}}>
                    <h2 style={{textAlign: 'center'}}>Добавление контента</h2>
                    <div>
                        <div className="pt-2 d-flex justify-content-center">
                            <div>Игра</div>
                            <button className="admin-modal" onClick={handleOpen}><img className="open-admin-modal" src={adminModal}/></button>
                        </div>
                        <div className="pt-4 d-flex justify-content-center">
                            <div>Категория</div>
                            <button className="admin-modal" onClick={handleOpenCategory}><img className="open-admin-modal" src={adminModal}/></button>
                        </div>
                        <div className="pt-4 d-flex justify-content-center">
                            <div>Компетенция</div>
                            <button className="admin-modal" onClick={handleOpenCompetency}><img className="open-admin-modal" src={adminModal}/></button>
                        </div>
                        <div className="pt-4 d-flex justify-content-center">
                            <div>Компетенция к игре</div>
                            <button className="admin-modal" onClick={handleOpenCompetencyFromGame}><img className="open-admin-modal" src={adminModal}/></button>
                        </div>
                    </div>
                </div>
                <div style={{width: "50%", textAlign: 'center'}} className="row col-6">
                    <h2>Добавление контента</h2>
                    <BasicTable metrics={metrics}/>
                </div>
            </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <Form className="d-flex flex-column">
                                <div className="d-flex">
                                    <Form.Control
                                        style={{width: '380px', height: '45px'}}
                                        className="input-modal"
                                        placeholder="Название игры"
                                        value={state.name}
                                        onChange={handleName}
                                    />
                                    <Form.Control
                                        style={{marginLeft: '11px', width: '265px', height: '45px'}}
                                        className="input-modal"
                                        placeholder="Категория игры"
                                        value={state.category}
                                        onChange={handleCategory}
                                    />
                                </div>
                                <Form.Control
                                    style={{width: '655px', height: '96px', padding: '0'}}
                                    className="input-modal"
                                    placeholder="Описание игры"
                                    value={state.description}
                                    onChange={handleDescription}
                                />

                                <Button className="mt-4" variant="primary"
                                        style={{width: '235px', height: '41px'}}
                                        onClick={handleAddGameClick}
                                >
                                    Добавить
                                </Button>
                            </Form>
                        </Typography>
                    </Box>
                </Modal>
                <Modal
                    open={openCategory}
                    onClose={handleCloseCategory}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <Form>
                                <Form.Control
                                    className="input-modal"
                                    placeholder="Категория"
                                    value={category.name}
                                    onChange={handleNameCategory}
                                />
                                <Button className="mt-4" variant="primary"
                                        onClick={handleAddCategoryClick}
                                >
                                    Добавить
                                </Button>
                            </Form>
                        </Typography>
                    </Box>
                </Modal>

                <Modal
                    open={openCompetency}
                    onClose={handleCloseCompetency}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <Form>
                                <Form.Control
                                    className="input-modal"
                                    placeholder="Компетенция"
                                    value={competency.name}
                                    onChange={handleCompetency}
                                />
                                <Button className="mt-2" variant="primary"
                                        onClick={handleAddCompetencyClick}
                                >
                                    Добавить
                                </Button>
                            </Form>
                        </Typography>
                    </Box>
                </Modal>
                <Modal
                    open={openCompetencyFromGame}
                    onClose={handleCloseCompetencyFromGame}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <Form>
                                <Form.Control
                                    className="input-modal"
                                    placeholder="Компетенция"
                                    value={competencyFromGame.competency}
                                    onChange={handleCompetencyFromGame}
                                />
                                <Form.Control
                                    className="input-modal"
                                    placeholder="Название игры"
                                    value={competencyFromGame.game}
                                    onChange={handlGameCompetency}
                                />
                                <Button className="mt-4" variant="primary"
                                        onClick={handleAddCompetencyFromGame}
                                >
                                    Добавить
                                </Button>
                            </Form>
                        </Typography>
                    </Box>
                </Modal>

        </Container>
    );
};

export default Admin;
