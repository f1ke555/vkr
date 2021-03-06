import React, {useContext, useEffect, useState} from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  MANE_ROUTE,
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
import logo from "../assets/logo.png"
import photo_navbar from "../assets/photo_navbar.png";
import logout from "../assets/logout.png";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    sessionStorage.clear()
    history.push('/login');
  };

  return (
    <Navbar className="navbar navbar-expand-lg">
      <Container>
          <NavLink to={MANE_ROUTE}><img src={logo}/></NavLink>
          {(sessionStorage.getItem('role') === 'admin') ?
              <button
                  style={{width: '307px', height: '41px'}}
                  className="btn btn-primary"
                  onClick={() => history.push(ADMIN_ROUTE)}>
                  Панель администратора
              </button>
              :
              <div></div>
          }
<div className="navbar-icons">
    <div onClick={() => history.push(MANE_ROUTE)} className="navbar-item">
        <div className="navbar-icon"><img src={home}></img></div>
        <button className="btn-nav"
                onClick={() => history.push(MANE_ROUTE)}>
            Главная
        </button>
    </div>
    <div className="navbar-item">
        <div
            onClick={() => history.push(CATEGORY_ROUTE)}
            className="navbar-icon"><img src={category}></img></div>
        <button className="btn-nav"
                onClick={() => history.push(CATEGORY_ROUTE)}
        >
            Категории
        </button>
    </div>
    <div className="navbar-item">
        <div
            onClick={() => history.push(ALLGAME_ROUTE)}
            className="navbar-icon"><img src={game}></img></div>
        <button className="btn-nav"
                onClick={() => history.push(ALLGAME_ROUTE)}
        >
            Все игры
        </button>
    </div>
        </div>

        {sessionStorage.getItem('token') ? (
          <Nav className="ml-auto">

              <div className="d-flex">
                  <div>
                      <div className="navbar-name">{sessionStorage.getItem('username')}</div>
                      <div className="navbar-group">{sessionStorage.getItem('group')}</div>
                  </div>
                  <img onClick={() => history.push(PROFILE_ROUTE)} style={{paddingLeft: '10px', cursor: "pointer"}} src={photo_navbar}/>
                  <div onClick={() => logOut()}>
                      <img style={{paddingLeft: '10px', paddingTop: "6px", cursor: "pointer"}} src={logout}/>
                  </div>
              </div>
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
