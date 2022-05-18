import React, {useContext, useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import AllGameList from "../components/AllGameList";
import {useHistory} from "react-router-dom";
import {ALLGAME_ROUTE} from "../utils/consts";
import {apiTransport} from "../transport/api.transport";
import CategoryItem from "../components/CategoryItem";
import {Autocomplete, TextField} from "@mui/material";


const Shop = (props) => {
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

    const handleSelect = (event) => {
        if (event.target.value === 'Категории') {
            setGameNamesOnCategory(null)
        } else {
            setGameNamesOnCategory(categories.find(item => item.name === event.target.value).games);
        }
    }

  return (
      <Container>
          <div className="d-flex justify-content-between">
              <h1 className="mt-5">{history.location.state?.hasCategories ? history.location.state.name : <div><span className="color-text">Все</span> игры</div>}</h1>
              <h1>{history.location.state?.hasCategories ? <button
                  onClick={() => history.push(ALLGAME_ROUTE)}
                  className="btn-category">
                  Показать католог игр
              </button> : ' '}</h1>
          </div>
          <h4 style={{fontWeight: "500"}}>Используйте площадку по максимуму и, главное, никогда не переставайте обучаться</h4>
          <div className="d-flex pt-4">
              <input
                  className="form-control input-find input-game mt-3"
                  placeholder="Начните вводить название для поиска"
                  onChange={handleChange}
              />
              <div>
                  <select onChange={handleSelect} name="Категории" style={{marginTop: "2px"}} className="btn-secondary">
                      <option style={{paddingLeft: '10px'}} value disabled selected>Категории</option>
                      {categories && categories.map((type) => (
                          <option
                              style={{ cursor: "pointer" }}
                              key={type.id}
                          >
                              {type.name}
                          </option>
                      ))}
                  </select>
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
