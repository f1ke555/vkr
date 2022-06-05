import React, {useContext, useEffect, useState} from "react";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import { Container, Form, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import account_circle from "../assets/account_circle.svg";
import mail_outline from "../assets/mail_outline.svg";
import vpn_key from "../assets/vpn_key.svg";
import supervised_user_circle from "../assets/supervised_user_circle.svg";
import {apiTransport} from "../transport/api.transport";
import {Context} from "../index";
import logo_auth from "../assets/logo_auth.png"
import show from "../assets/show.svg"
import help from "../assets/help.svg"
import validation from "../assets/validation.svg"
import no_show from "../assets/no_show.svg"


const DEFAULT_FORM_VALUES = {
  login: '',
  password: '',
  name: '',
  group: '',
  admin: false
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
  const [formValid, setFormValid] = useState(false);
  const [state, setState] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');
  const [loginDirty, setLoginDirty] = useState(false);

  const history = useHistory();
  const { user } = useContext(Context);

  const handleRegistrationClick = async () => {
    await apiTransport.createNewAccount(formValues)
        .then((response) => console.log(response))
        .catch(function (error) {
          if (error.response) {
            setErrorLogin('Пользователь с такой почтой уже существует')
            setLoginDirty(true)
          }
        });
    history.push('/login');
  }

  const handleLogin = async () => {
    await apiTransport.authorization({ username: formValues.login, password: formValues.password })
        .then((response) => {
          sessionStorage.setItem('token', response.data.access_token);
          sessionStorage.setItem('username', response.data.name);
          sessionStorage.setItem('group', response.data.group);
          sessionStorage.setItem('role', response.data.role);
          const checkSession = setInterval(() => {
            const getKey = sessionStorage.getItem('token');
            console.log(getKey);
            if (!getKey) clearInterval(checkSession);

            apiTransport.authValidation(getKey)
                .catch(() => {
              sessionStorage.clear()
                  history.push('/login');
            })
          }, 10000);

          user.setIsAdmin(response.data.role === 'admin');
          history.push('/');
        }).catch(function (error) {
          if (error.response) {
            setErrorLogin('Неверной имя пользователя или пароль')
            setLoginDirty(true)
          }
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

  const toggleBtn = (e) => {
    e.preventDefault();
    setState(prevState => !prevState);
    setShowPassword(prevState => !prevState)
  }

  return (
      <Container className="d-flex justify-content-center align-items-center flex-column pt-5" >
        <div>
          <div style={{position: "relative"}}>
            <img
                src={logo_auth}
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
          <h1 className="auth-header">{isLogin ? <div>C <span className="color-text">возвращением</span>!</div> : <div><span className="color-text">Создание</span> аккаунта</div>}</h1>
          <div className="auth-subheader">
            {isLogin ?
                <div>Мы рады, что Вы снова используете нашу платформу</div>
              :
                <div className="d-flex">
                  <div style={{position: 'relative'}}>Создайте аккаунт и вам откроются новые функции</div>
                  <div style={{marginLeft: "7px"}} className="first"><img src={help}></img>
                  </div>
                  <div className="fourth help-function">Аккаунт нужен для того, чтобы оставлять комментарии, отслеживать и сохранять игровой прогресс и многое другое</div>
                </div>

          }
          </div>
          {isLogin ? (

              <Form className="d-flex flex-column">
                <Form.Control
                    autocomplete="disabled"
                    placeholder="Почта"
                    value={formValues.login}
                    onChange={handleEmail}
                />
                <div className="img-input-mail-reg"><img src={mail_outline}></img></div>
                <div style={{position: "relative"}}>
                  <Form.Control
                      autocomplete="disabled"
                      placeholder="Пароль"
                      type={state ? "text" : "password"}
                      value={formValues.password}
                      onChange={handlePassword}
                  />

                  <div className="img-input-password-reg"><img src={vpn_key}></img></div>
                  <div style={{position: "absolute", left: '464px', top: '18px'}}>
                    <button
                        style={{background: "transparent", border: '0', paddingRight: "10px"}}
                        onClick={toggleBtn}>
                      {showPassword ?
                          <img src={no_show}/>
                          :
                          <img src={show}/>
                      }
                    </button>
                  </div>
                </div>
                <div style={{position: 'relative'}}>
                  {loginDirty ?
                      <div className="validation-group-auth">
                        <div className="error-text">{errorLogin}</div>
                        <div className="error-discryption">Возможно, Вы ввели неправильный домен или пропустили букву</div>
                      </div>
                      :
                      <div></div>
                  }
                </div>
                <div></div>
                <Button className="mt-4 w-275" variant="primary" onClick={handleLogin}>
                  Войти на сайт
                </Button>
              </Form>
          ) : (
              <Form
                  style={{position: 'relative'}}
                  className="d-flex flex-column ">
                <Form.Control
                    autocomplete="disabled"
                    placeholder="Фамилия и имя"
                    onChange={handleName}
                    onBlur={e => blurHandler(e)}
                    name="name"
                    type="text"
                    value={formValues.name}
                />
                <div className="img-input"><img src={account_circle}></img></div>
                <Form.Control
                    autocomplete="disabled"
                    placeholder="Академическая группа"
                    onChange={handleGroup}
                    value={formValues.group}
                />
                <div className="img-input-group"><img src={supervised_user_circle}></img></div>

                <Form.Control
                    autocomplete="disabled"
                    onBlur={e => blurHandler(e)}
                    name='email'
                    type="text"
                    placeholder="Почта"
                    value={formValues.email}
                    onChange={handleEmail}
                />
                <div className="img-input-mail"><img src={mail_outline}></img></div>
                <Form.Control
                    autocomplete="disabled"
                    name='password'
                    onBlur={e => blurHandler(e)}
                    placeholder="Пароль"
                    type={state ? "text" : "password"}
                    value={formValues.password}
                    onChange={handlePassword}
                />
                <div className="img-input-password"><img src={vpn_key}></img></div>

                {(nameDirty && nameError) &&
                    <div className="validation-name">
                      <div className="error-text">{nameError}</div>
                      <div className="error-discryption">Возможно, Вы ввели неправильный домен или пропустили букву</div>
                      <div className="error"><img src={validation}></img></div>
                    </div>

                }
                {(emailDirty && emailError) &&
                    <div className="validation-email">
                      <div className="error-text">{emailError}</div>
                      <div className="error-discryption">Возможно, Вы ввели неправильный домен или пропустили букву</div>
                      <div style={{bottom: '17px'}} className="error"><img src={validation}></img></div>
                    </div>
                }

                {(passwordDirty && passwordError) ?
                    <div className="validation-group">
                      <div className="error-text">{passwordError}</div>
                      <div className="error-discryption">Возможно, Вы ввели неправильный домен или пропустили букву</div>
                      <div style={{bottom: '36px'}} className="error"><img src={validation}></img></div>
                    </div>
                    :
                    <div className="img-show-password">
                      <button
                          style={{background: "transparent", border: '0'}}
                          onClick={toggleBtn}>
                        {showPassword ?
                            <img src={no_show}/>
                            :
                            <img src={show}/>
                        }
                      </button>
                    </div>
                }
                <div style={{position: 'relative'}}>
                  {loginDirty ?
                      <div className="validation-group-auth">
                        <div className="error-text">{errorLogin}</div>
                        <div className="error-discryption">Попробуйте изменить почту</div>
                      </div>
                      :
                      <div></div>
                  }
                </div>
                <Button disabled = {!formValid} className="mt-4" variant={"primary"} onClick={handleRegistrationClick}>
                  Зарегистрироваться
                </Button>
              </Form>
          )}
        </div>

    </Container>
  );
};

export default Auth;
