import React, {useContext, useEffect, useState} from "react";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import { Container, Form, Image } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import account_circle from "../assets/account_circle.png";
import mail_outline from "../assets/mail_outline.png";
import vpn_key from "../assets/vpn_key.png";
import supervised_user_circle from "../assets/supervised_user_circle.png";
import {apiTransport} from "../transport/api.transport";
import {Context} from "../index";
import logotip from "../assets/logotip.png";


const DEFAULT_FORM_VALUES = {
  login: '',
  password: '',
  name: '',
  group: ''
}

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Емейл не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');
  const [nameDirty, setNameDirty] = useState(false);
  const [nameError, setNameError] = useState('ФИО не может быть пустым')
  const [formValid, setFormValid] = useState(false)
  const history = useHistory();
  const { user } = useContext(Context);

  const handleRegistrationClick = async () => {
    await apiTransport.createNewAccount(formValues)
        .then((response) => console.log(response))
        .catch((e) => console.log(e));
  };

  const handleLogin = async () => {
    await apiTransport.authorization({ username: formValues.login, password: formValues.password })
        .then((response) => {
          sessionStorage.setItem('token', response.data.access_token);
          sessionStorage.setItem('username', response.data.name);
          const checkSession = setInterval(() => {
            const getKey = sessionStorage.getItem('token');
            console.log(getKey);
            if (!getKey) clearInterval(checkSession);

            apiTransport.authValidation(getKey);
          }, 10000);

          user.setIsAuth(true);
          history.push('/');
        });
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
      case 'name':
        setNameDirty(true)
        break
    }
  }

  const handleEmail = (e) => {
    setFormValues(prevValue => ({ ...prevValue, login: e.target.value }));
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(e.target.value).toLowerCase())){
      setEmailError('Некорректный емейл')
    } else {
      setEmailError('')
    }
  }

  const handleName = (e) => {
    setFormValues((prevValue) => ({ ...prevValue, name: e.target.value }));
    const re = /([а-яА-яa-zA-z]+\s)+(([а-яА-яa-zA-z]{2,23})+)/ig;
    if (!re.test(String(e.target.value).toLowerCase())){
      setNameError('Некорректное ФИО')
    } else {
      setNameError('')
    }
  }



  const handlePassword = (e) => {
    setFormValues((prevValue) => ({ ...prevValue, password: e.target.value }));
    if (e.target.value.length < 8) {
      setPasswordError('Пароль должен быть длиннее 8 символов')
      if (!e.target.value) {
        setPasswordError('Пароль не может быть пустым')
      }
    } else {
      setPasswordError('')
    }
  }

  const handleGroup = (e) => {
    setFormValues((prevValue) => ({ ...prevValue, group: e.target.value }));
  }

  useEffect(() => {
    if(emailError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [emailError, passwordError])
  

  return (
      <Container className="d-flex justify-content-center align-items-center flex-column pt-5" >
        <div>
          <div style={{position: "relative"}}>
            <img
                src={logotip}
            />
            {isLogin ? (
                <div className="hint mt-3">
                  {"У вас нет аккаунта? "}
                  <div>
                    <NavLink to={REGISTRATION_ROUTE}>Создать аккаунт</NavLink>
                  </div>

                </div>
            ) : (
                <div className="hint mt-3">
                  {"Есть аккаунт? "}
                  <div>
                    <NavLink style={{paddingTop: '10px'}} to={LOGIN_ROUTE}>Войдите!</NavLink>
                  </div>
                </div>
            )}
          </div>
          <h1 className="m-0 mt-5">{isLogin ? <div>C <span className="color-text">возвращением</span>!</div> : <div><span className="color-text">Создание</span> аккаунта</div>}</h1>
          <div className="m-0">{isLogin ? <div>Мы рады, что Вы снова используете нашу платформу</div> : <div>Создайте аккаунт и вам откроются новые функции</div>}</div>
          {isLogin ? (

              <Form className="d-flex flex-column">
                <Form.Control
                    placeholder="Введите почту"
                    value={formValues.login}
                    onChange={handleEmail}
                />
                <div className="img-input-mail-reg"><img src={mail_outline}></img></div>
                <Form.Control
                    placeholder="Введите пароль"
                    type="password"
                    value={formValues.password}
                    onChange={handlePassword}
                />
                <div className="img-input-password-reg"><img src={vpn_key}></img></div>
                <Button className="mt-4" variant="primary" onClick={handleLogin}>
                  Войти
                </Button>
              </Form>
          ) : (
              <Form className="d-flex flex-column ">
                <Form.Control
                    placeholder="Введите свою фамилию и имя"
                    onChange={handleName}
                    onBlur={e => blurHandler(e)}
                    name="name"
                    type="text"
                    value={formValues.name}
                />
                <div className="img-input"><img src={account_circle}></img></div>

                <Form.Control
                    placeholder="Введите свою академическую группу"
                    onChange={handleGroup}
                    value={formValues.group}
                />
                <div className="img-input-group"><img src={supervised_user_circle}></img></div>

                <Form.Control
                    onBlur={e => blurHandler(e)}
                    name='email'
                    type="text"
                    placeholder="Введите почту"
                    value={formValues.email}
                    onChange={handleEmail}
                />
                <div className="img-input-mail"><img src={mail_outline}></img></div>

                <Form.Control
                    name='password'
                    onBlur={e => blurHandler(e)}
                    placeholder="Введите пароль"
                    type="password"
                    value={formValues.password}
                    onChange={handlePassword}
                />
                <div className="img-input-password"><img src={vpn_key}></img></div>

                {(nameDirty && nameError) && <div className="validation">{nameError}</div>}
                {(emailDirty && emailError) && <div className="validation">{emailError}</div>}
                {(passwordDirty && passwordError) && <div className="validation">{passwordError}</div>}
                <Button disabled = {!formValid} className="mt-4" variant={"primary"} onClick={handleRegistrationClick}>
                  Регистрация
                </Button>
              </Form>
          )}
        </div>

    </Container>
  );
};

export default Auth;
