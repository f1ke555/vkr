import React, {useRef, useState} from "react";
import { Container } from "react-bootstrap";
import DeviceList from "../components/DeviceList";
import CategoryList from "../components/CategoryList";
import input_find from "../assets/input_find.svg";
import {ALLGAME_ROUTE, CATEGORY_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";



const Shop = () => {
    const [searchText, setSearchText] = useState('');
    const handleChange = (event) => {
        setSearchText(event.target.value);
    }
    const history = useHistory()

  return (
      <Container className="">
          <h3 style={{paddingTop: "117px"}}
              className="d-flex justify-content-center">
              Добро пожаловать на онлайн платформу образовательных игр
          </h3>
          <h1 style={{paddingTop: "35px", paddingBottom: "40px"}}
              className="d-flex justify-content-center">
              Какой <span style={{padding: '0 10px'}} className="color-text">предмет</span> вы хотите освоить?
          </h1>
          <div style={{position: "relative"}}>
              <div style={{position: "absolute", left: "323px", top: '9px'}} className=""><img src={input_find}></img></div>
              <input
                  className="form-control input-find mt-3"
                  placeholder="Начните искать @игру или #категорию"
                  onChange={handleChange}
              />
          </div>
          <div style={{position: "relative"}}>
              <h2 className="mt-5 mn-5 d-flex justify-content-center"
              >Категории</h2>
              <button
                  style={{position: 'absolute', right: '14%', top: '5px'}}
                  onClick={() => history.push(CATEGORY_ROUTE)}
                  className="btn-allcategory">
                  Показать все категории
              </button>
          </div>

              <CategoryList  searchText={searchText.includes('#') ? searchText.replace('#', '') : ''}/>
          <div style={{position: "relative"}}>
              <h2 className="mt-5 mn-5 d-flex justify-content-center"
              >Игры</h2>
              <button
                  style={{position: 'absolute', right: '13%', top: '5px'}}
                  onClick={() => history.push(ALLGAME_ROUTE)}
                  className="btn-allcategory">
                  Показать все игры
              </button>
          </div>
              <DeviceList searchText={searchText.includes('@') ? searchText.replace('@', '') : ''}/>
    </Container>
      
  );
};

export default Shop;
