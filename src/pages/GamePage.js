import React, {useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import AllGameList from "../components/AllGameList";
import {useHistory} from "react-router-dom";
import {ALLGAME_ROUTE} from "../utils/consts";
import {apiTransport} from "../transport/api.transport";
import input_find from "../assets/input_find.svg";
import line from "../assets/filter.svg";

const Shop = () => {
  const history = useHistory();
    const [searchText, setSearchText] = useState('');
    const handleChange = (event) => {
        setSearchText(event.target.value);
    }
    const [categories, setCategories] = useState([]);
    const [gameNamesOnCategory, setGameNamesOnCategory] = useState(null)

    useEffect(() => {
        apiTransport.getAllCategories()
            .then(response => setCategories(response.data) );
    }, [])

    const changeSelect = () => {
        const selectHeader = document.querySelectorAll('.select__header')

        selectHeader.forEach((item) => item.parentElement.classList.toggle('is-active'))
        selectHeader.forEach((item) => item.parentElement.classList.toggle('rotate-img'))
    }

    const choiceSelect = (name) => {
        setGameNamesOnCategory(categories.find(item => item.name === name).games);
    }


  return (
      <Container>
          <div className="d-flex justify-content-between">
              <h1 className="mt-5">{history.location.state?.hasCategories ? history.location.state.name : <div><span className="color-text">Все</span> игры</div>}</h1>
              <h1>{history.location.state?.hasCategories ? <button
                  onClick={() => history.push(ALLGAME_ROUTE)}
                  className="btn-category">
                  Показать каталог игр
              </button> : ' '}</h1>
          </div>
          <h4 style={{fontWeight: "500"}}>Используйте площадку по максимуму и, главное, никогда не переставайте обучаться</h4>
          <div style={{position: "relative"}} className="d-flex pt-4">
              <div style={{position: "absolute", left: '10px', top: '31px'}} className=""><img src={input_find}></img></div>
              <input
                  className="form-control input-find input-game mt-3"
                  placeholder="Начните вводить название для поиска"
                  onChange={handleChange}
              />
              <div className="select">
                  <div className="select__header" onClick={changeSelect}>
                      <span className="select__current">Категории</span>
                      <div className="select__icon"><img src={line} /></div>
                  </div>
                  <div className="select__body">
                      {categories && categories.map((type) => (
                          <div className="select__item" key={type.id} onClick={choiceSelect.bind(null, type.name)}>{type.name}</div>
                      ))}
                  </div>
              </div>



          </div>
      <AllGameList
          gameNames={gameNamesOnCategory}
          searchText={searchText}
          hasCategories={history.location.state?.hasCategories}
          gamesIds={history.location.state?.games ? history.location.state.games.map(item => item.categoryId) : [] }
      />
    </Container>
  );
};

export default Shop;
