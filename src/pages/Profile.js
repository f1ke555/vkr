import React, {useContext, useEffect, useState} from "react";
import {Card, Image, Container} from "react-bootstrap";
import {apiTransport} from "../transport/api.transport";
import {Autocomplete, Chip, TextField, Modal, Typography, Paper} from "@mui/material";
import {Box} from "@mui/system";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import mail_outline from "../assets/mail_outline.svg"
import university from "../assets/university.svg";
import direction from "../assets/direction.svg";
import photo from "../assets/photo.png";
import account_circle from "../assets/account_circle.svg";
import supervised_user_circle from "../assets/supervised_user_circle.svg";
import phone_icon from "../assets/phone_icon.svg"
import lock from "../assets/lock.svg"
import input_find from "../assets/input_find.svg";
import {ALLGAME_ROUTE, PROFILE_ROUTE} from "../utils/consts";

const DEFAULT_PROFILE_INFO = {
  "id":0,
  "login":"",
  "password":"",
  "name":"",
  "group":"",
  "savedData": [],
  "univercity": '',
  "specialization": '',
  'phone': '',
  'competencies': ''
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 970,
  height: 470,
    background: 'linear-gradient(84.79deg, #420D55 -16.43%, #2A0A47 118.26%)',
  border: '8px',
  p: 4,
  boxShadow: '0px 4px 11px 1px rgba(0, 0, 0, 0.13)',
    borderRadius: '8px'
};

function Profile () {
  const { user } = useContext(Context);
  const history = useHistory();

  const [competency, setCompetency] = useState([]);
  const [competenciesProfile, setCompetenciesProfile] = useState([]);
  const [profileInfo, setProfileInfo] = useState(DEFAULT_PROFILE_INFO);
  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    apiTransport.getProfileInfo()
        .then(resp => setProfileInfo(resp.data))

      apiTransport.getProfileCompetencies()
          .then(resp => setCompetenciesProfile(resp.data))

    apiTransport.getAllCompetencies()
        .then(resp => setCompetency(resp.data));
  }, []);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    sessionStorage.setItem('token', null);
    history.push('/');
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeFromValues = (fieldName, e) => {
    console.log(fieldName, e);
    setProfileInfo(prevState => ({...prevState, [fieldName]: e.target.value}));
  }

  const handleDeleteCompetency = (name) => {
    apiTransport.removeСompetency(name)
        .then(() => {
            apiTransport.getProfileCompetencies()
                .then(resp => setCompetenciesProfile(resp.data))
        })
  }

  const handleAddCompetency = (name, value) => {
      value.forEach((item) => {
          apiTransport.addСompetency(item)
      })
  }

  const handleSubmit = () => {
    apiTransport.changeProfile(profileInfo)
      apiTransport.getProfileCompetencies()
          .then(resp => setCompetenciesProfile(resp.data))
      setOpen(false);

  }

  return (
    <Container>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h3" style={{color: '#fff', fontWeight: '700', fontSize: '30px'}}>
                    Редактирование профиля
                </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="d-flex justify-content-between">
              <div style={{position: "relative"}}>
                <h4 className="pb-1">Основная информация</h4>
                <div style={{position: "absolute", left: "12px", top: "33px"}}><img src={account_circle}></img></div>
                  <div style={{position: "absolute", left: "345px", top: "33px"}}><img src={lock}></img></div>
                <input style={{boxShadow: 'none'}} className="input-modal input-modal-category form-control" disabled="true" placeholder={profileInfo.name}/>
                <div style={{position: "absolute", left: "12px", top: "90px"}}><img src={supervised_user_circle}></img></div>
                  <div style={{position: "absolute", left: "345px", top: "90px"}}><img src={lock}></img></div>
                <input style={{boxShadow: 'none'}} className="input-modal input-modal-category form-control" disabled="true" placeholder={profileInfo.group}/>
                <div style={{position: "absolute", left: "12px", top: "145px"}}><img src={university}></img></div>
                <div style={{position: "absolute", left: "12px", top: "200px"}}><img src={direction}></img></div>
                <input
                    className="input-modal input-modal-category form-control"
                    placeholder="Название института"
                    onChange={handleChangeFromValues.bind(null, 'univercity')}
                />

                <input
                    className="input-modal input-modal-category form-control"
                    placeholder="Название направления"
                    onChange={handleChangeFromValues.bind(null, 'specialization')}
                />
              </div>
              <div>
                <h4 className="pb-1">Выбор интересов</h4>
                  <div style={{position: 'relative'}}>
                      <div style={{position: "absolute", top: '10px', zIndex: '1', left: '10px'}}><img src={input_find}></img></div>
                      <Autocomplete
                          multiple
                          onChange={(e, value) => handleAddCompetency(e, value)}
                          id="tags-filled"
                          PaperComponent={({ children }) => (
                              <Paper style={{
                                  background: "linear-gradient(89.92deg, #360771 -149.34%, #3D0F4E 197.42%)",
                                  marginTop: '5px',
                                  boxShadow: '0px 1px 12px rgba(0, 0, 0, 0.3)',
                                  borderRadius: '6px',
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  lineHeight: '165%',
                                  color: '#FFFFFF',
                                  fontFamily: 'Montserrat',
                                  paddingLeft: '30px'
                              }}

                              >{children}</Paper>
                          )}
                          options={competency.map((option) => option.name)}
                          renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                  <Chip
                                      style={{
                                          background: '#735686',
                                          boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                                          borderRadius: '3px',
                                          fontWeight: '700',
                                          fontSize: '12px',
                                          lineHeight: '110%',
                                          color: '#FFFFFF',
                                      }}
                                      label={option}
                                      {...getTagProps({ index })}
                                      onDelete={handleDeleteCompetency}
                                  />
                              ))
                          }
                          renderInput={(params) => (
                              <TextField
                                  style={{
                                      fontWeight: '700',
                                      fontSize: '14px',
                                      lineHeight: '85%',
                                      color: '#735686',
                                  }}
                                  {...params}
                                  variant="filled"
                                  placeholder="Поиск интересов"
                              />
                          )}
                      />
                  </div>

                <div style={{paddingTop: "40px", position: 'relative'}}>
                  <h4 className="pb-1">Контактная информация</h4>
                  <div style={{position: "absolute", left: '10px', top: '75px' }}><img src={mail_outline}></img></div>
                    <div style={{position: "absolute", left: '340px', top: '75px' }}><img src={lock}></img></div>
                  <input style={{boxShadow: 'none'}} className="input-modal input-modal-category form-control" disabled placeholder={profileInfo.login}/>
                    <div style={{position: "absolute", left: '10px', top: '130px' }}><img src={phone_icon}></img></div>
                    <input
                        className="input-modal input-modal-category form-control"
                        placeholder="Номер телефона"
                        onChange={handleChangeFromValues.bind(null, 'phone')}
                    />
                </div>
              </div>
              </div>


          </Typography>
          <div className="d-flex justify-content-center pt-4">
            <button className="btn btn-primary mt-4" onClick={handleSubmit}>
              Сохранить
            </button>
          </div>
        </Box>
      </Modal>
      <h1 className="mt-5">Профиль</h1>
      <div class="row profile">
        <div class="col-6">
          <Card style={{ height: "471px" }}>
            <div className="d-flex">
             <img style={{position: "relative", right: "13px"}} src={photo}/>
              <div className="ms-3 pt-2">
                <div>{profileInfo.name}</div>
                <div className="name-group">{profileInfo.group}</div>
                <button
                    className="btn-profile" onClick={handleOpen}>Редактировать</button>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <div className="text-table">
                <div>Телефон</div>
                <div>Почта</div>
                <div>Институт</div>
                <div>Направление</div>
                <div>Интересы:</div>
              </div>
              <div style={{fontWeight: '500', textAlign: 'end'}}>
                <div>{profileInfo.phone}</div>
                <div>{profileInfo.login}</div>
                <div>{profileInfo.univercity}</div>
                <div>{profileInfo.specialization}</div>
              </div>

            </div>
              <div>
                  {competenciesProfile && competenciesProfile.map((item) => {
                      return <Chip style={{
                          background: '#735686',
                          boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
                          borderRadius: '3px',
                          fontWeight: '700',
                          fontSize: '12px',
                          lineHeight: '110%',
                          color: '#FFFFFF',
                          marginRight: '10px',
                          marginTop: '10px',
                      }} onDelete={handleDeleteCompetency.bind(null, item.name)} label={item.name}/>
                  })}
              </div>
          </Card>
        </div>
        {/*<div className="col-6">*/}
        {/*  <div className="row">*/}
        {/*    <Card style={{ height: "320px" }}>*/}
        {/*      <h2>Компетенции</h2>*/}
        {/*    </Card>*/}
        {/*  </div>*/}
        {/*  <div className="row mt-3">*/}
        {/*    <Card style={{ height: "134px" }}>*/}
        {/*      <h2>Прогресс</h2>*/}
        {/*    </Card>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <div className="d-flex justify-content-center pt-5">
        <button
            onClick={() => logOut()} className="btn btn-primary"
        >
          Выйти из аккаунта
        </button>
      </div>
    </Container>
  );
};

export default Profile;
