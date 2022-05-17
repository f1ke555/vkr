import React, {useContext, useEffect, useState} from "react";
import {Card, Image, Container} from "react-bootstrap";
import {apiTransport} from "../transport/api.transport";
import {Autocomplete, Chip, TextField, Modal, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {Context} from "../index";
import {useHistory} from "react-router-dom";

const DEFAULT_PROFILE_INFO = {
  "id":0,
  "login":"",
  "password":"",
  "name":"",
  "group":"",
  "savedData": []
}

const competency = [
  { title: "Анализ" },
  { title: "Дизайн" },
  { title: "Аналитика" },
  { title: "Мышление" },

];


function Profile () {

  const { user } = useContext(Context);
  const history = useHistory()

  const [receivers, setReceivers] = useState([]);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    sessionStorage.setItem('token', null);
    history.push('/');
  };

  const [profileInfo, setProfileInfo] = useState(DEFAULT_PROFILE_INFO)
  useEffect(() => {
    apiTransport.getProfileInfo()
        .then(resp => setProfileInfo(resp.data))
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 970,
    height: 500,
    backgroundColor: '#4B185F',
    border: '8px',
    p: 4,
   boxShadow: '0px 4px 11px 1px rgba(0, 0, 0, 0.13)',
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            Редактирование формы профиля
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="d-flex justify-content-between">
              <div>
                <h4>Основная информация</h4>
                <input className="input-modal form-control" disabled="true" placeholder={profileInfo.name}/>
                <input className="input-modal form-control" disabled="true" placeholder={profileInfo.group}/>
                <select style={{lineHeight: '24px'}} className="input-modal form-control" placeholder="Введите номер курса">
                  <option className="form-control" value="value1">1</option>
                  <option className="form-control" value="value2">2</option>
                  <option className="form-control" value="value3">3</option>
                  <option className="form-control" value="value2">4</option>
                  <option className="form-control" value="value3">5</option>
                </select>
                <input className="input-modal form-control" placeholder="Введите название института"/>
                <input className="input-modal form-control" placeholder="Введите название направления"/>
              </div>
              <div>
                <h4>Выбор интересов</h4>
                <Autocomplete
                    className="form-control input-select"
                    multiple
                    onChange={(e, value) => setReceivers((state) => value)}
                    id="tags-filled"
                    options={competency.map((option) => option.title)}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip color="warning" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                            label="freeSolo"
                            placeholder="Favorites"
                        />
                    )}
                />
                <div style={{paddingTop: "58px"}}>
                  <h4>Контактная информация</h4>
                  <input className="input-modal form-control" disabled placeholder={profileInfo.login}/>
                </div>


                <input className="input-modal form-control"  placeholder="Введите номер телефона"/>
              </div>
              </div>


          </Typography>
          <div className="d-flex justify-content-center pt-4">
            <button className="btn btn-primary mt-4">
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
              <Image
                width={145}
                height={145}
                src="http://www.camaracambuquira.mg.gov.br/images/lofthumbs/500x250/images/stories/maquete1.jpg"
              />
              <div className="ms-3">
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
                <div>Курс</div>
                <div>Институт</div>
                <div>Направление</div>
                <div>Интересы:</div>
              </div>
              <div>
                <div>8 (800) 555-35-35</div>
                <div>{profileInfo.login}</div>
                <div>2</div>
                <div>ИРИТ-РТФ</div>
                <div>Программная инженерия</div>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-6">
          <div className="row">
            <Card style={{ height: "320px" }}>
              <h2>Компетенции</h2>
            </Card>
          </div>
          <div className="row mt-3">
            <Card style={{ height: "134px" }}>
              <h2>Прогресс</h2>
            </Card>
          </div>
        </div>
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
