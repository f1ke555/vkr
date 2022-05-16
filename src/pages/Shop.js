import React from "react";
import { Container } from "react-bootstrap";
import DeviceList from "../components/DeviceList";
import CategoryList from "../components/CategoryList";
import search_icon from "../assets/search_icon.png"
import arrow from "../assets/arrow.png";


const Shop = () => {
  return (
      <Container className="">
          <h3 style={{paddingTop: "50px"}}
              className="d-flex justify-content-center">
              Добро пожаловать на онлайн платформу образовательных игр
          </h3>
          <h1 style={{paddingTop: "35px"}}
              className="d-flex justify-content-center">
              Какой <span className="color-text">предмет </span> вы хотите освоить?
          </h1>
      <input
        className="form-control input-find mt-3"
        placeholder="Начните искать игру или #категорию"
        onChange={(event) => console.log(event.target.value)}
      />
          <div className="">
              <h2 className="mt-5 mn-5 d-flex justify-content-center"
              >Категории</h2>
          </div>
          <div
              style={{position: "relative"}}
          >
              <div className="knopka"></div>
              <div className="knopkaright"></div>
              <CategoryList />
          </div>
      <h2 className="mt-5 d-flex justify-content-center">Недавно просмотренные игры</h2>
          <div style={{position: "relative"}}>
              <div className="knopkagame"></div>
              <div className="knopkagameright"></div>
              <DeviceList />
          </div>
    </Container>
      
  );
};

export default Shop;
