import React, {useRef, useState} from "react";
import { Container } from "react-bootstrap";
import DeviceList from "../components/DeviceList";
import CategoryList from "../components/CategoryList";
import input_find from "../assets/input_find.png";
import lineleft from "../assets/lineleft.svg";
import lineright from "../assets/lineright.png"

const Shop = () => {
    const [searchText, setSearchText] = useState('');
    const handleChange = (event) => {
        setSearchText(event.target.value);
    }

    const click = useRef(null)
    const handleClick = (e) => {
        click.current.scrollLeft += e.deltaY;
    }

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
          <div className="">
              <h2 className="mt-5 mn-5 d-flex justify-content-center"
              >Категории</h2>
          </div>
          <div
              style={{position: "relative"}}
          >
              <div onClick={handleClick} ref={click} className="knopka">
                  <img className="arrow-scroll" src={lineleft}/>
              </div>
              <div className="knopkaright">
                  <img className="arrow-scroll" src={lineright}/>
              </div>
              <CategoryList  searchText={searchText.includes('#') ? searchText.replace('#', '') : ''}/>
          </div>
      <h2 className="mt-5 d-flex justify-content-center">Игры</h2>
          <div style={{position: "relative"}}>
              <div className="knopkagame">
                  <img className="arrow-scroll" src={lineleft}/>
              </div>
              <div className="knopkagameright">
                  <img className="arrow-scroll" src={lineright}/>
              </div>
              <DeviceList searchText={searchText.includes('@') ? searchText.replace('@', '') : ''}/>
          </div>
    </Container>
      
  );
};

export default Shop;
