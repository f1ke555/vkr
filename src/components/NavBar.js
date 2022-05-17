import React, { useContext } from "react";
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
const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    sessionStorage.setItem('token', null);
    history.push('/');
  };

  return (
    <Navbar className="navbar navbar-expand-lg">
      <Container>
          <NavLink to={SHOP_ROUTE}>LOGO</NavLink>
<div>
          <button className="btn-nav"
                  onClick={() => history.push(SHOP_ROUTE)}>
            Главная
          </button>
          <button className="btn-nav"
                  onClick={() => history.push(CATEGORY_ROUTE)}
          >
            Категории
          </button>
          <button className="btn-nav"
                  onClick={() => history.push(ALLGAME_ROUTE)}
          >
            Все игры
          </button>
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
