import React, {useContext, useEffect, useState} from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  REGISTRATION_ROUTE,
  PROFILE_ROUTE,
  ALLGAME_ROUTE,
  CATEGORY_ROUTE,
} from "../utils/consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import home from "../assets/home.png";
import game from "../assets/game.png";
import category from "../assets/category.png";
import {apiTransport} from "../transport/api.transport";
import logo from "../assets/logo.png"

const DEFAULT_PROFILE_INFO = {
    "id":0,
    "login":"",
    "password":"",
    "name":"",
    "group":"",
    "savedData": []
}

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();

    const [profileInfo, setProfileInfo] = useState(DEFAULT_PROFILE_INFO)
    useEffect(() => {
        apiTransport.getProfileInfo()
            .then(resp => setProfileInfo(resp.data))
    }, []);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    sessionStorage.setItem('token', null);
    history.push('/');
  };

  return (
    <Navbar className="navbar navbar-expand-lg">
      <Container>
          <NavLink to={SHOP_ROUTE}><img src={logo}/></NavLink>
<div className="d-flex navbar-icon">
    <div onClick={() => history.push(SHOP_ROUTE)}>
        <div className="navbar-icon-abs"><img src={home}></img></div>
        <button className="btn-nav"
                onClick={() => history.push(SHOP_ROUTE)}>
            Главная
        </button>
    </div>
    <div>
        <div
            onClick={() => history.push(CATEGORY_ROUTE)}
            className="navbar-icon-category"><img src={category}></img></div>
        <button className="btn-nav"
                onClick={() => history.push(CATEGORY_ROUTE)}
        >
            Категории
        </button>
    </div>
    <div>
        <div
            onClick={() => history.push(ALLGAME_ROUTE)}
            className="navbar-icon-game"><img src={game}></img></div>
        <button className="btn-nav"
                onClick={() => history.push(ALLGAME_ROUTE)}
        >
            Все игры
        </button>
    </div>
        </div>

        {user.isAuth ? (
          <Nav className="ml-auto">
            <Button onClick={() => history.push(PROFILE_ROUTE)}>
              Профиль
            </Button>
            <button
            onClick={() => logOut()} className="ms-2 btn-secondary"
            >
              Выйти
            </button>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            <Button onClick={() => history.push(LOGIN_ROUTE)}>Вход</Button>
            <button
              onClick={() => history.push(REGISTRATION_ROUTE)}
              className="ms-2 btn-secondary"
            >
              Регистрация
            </button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
