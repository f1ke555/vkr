import React, {useContext, useEffect, useState} from "react";
import { Container } from "react-bootstrap";
import AllGameList from "../components/AllGameList";
import {useHistory} from "react-router-dom";
import {ALLGAME_ROUTE} from "../utils/consts";


const Shop = () => {
  const history = useHistory();
    const [searchText, setSearchText] = useState('');
    const handleChange = (event) => {
        setSearchText(event.target.value);
    }

  return (
      <Container>
      <input
        className="form-control input-find mt-3"
        placeholder="Начните вводить название для поиска"
        onChange={handleChange}
      />
          <div className="d-flex justify-content-between">
              <h2 className="mt-5">{history.location.state?.hasCategories ? history.location.state.name : 'Все игры'}</h2>
              <button
                  onClick={() => history.push(ALLGAME_ROUTE)}
                  className="btn-category">
                  Показать католог игр
              </button>
          </div>
      <AllGameList
          searchText={searchText}
          hasCategories={history.location.state?.hasCategories}
          gamesIds={history.location.state?.games ? history.location.state.games.map(item => item.categoryId) : [] }
      />
    </Container>
  );
};

export default Shop;
