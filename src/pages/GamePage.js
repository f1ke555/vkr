import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import AllGameList from "../components/AllGameList";
import {useHistory} from "react-router-dom";
import search_icon from "../assets/search_icon.png";
import {ALLGAME_ROUTE} from "../utils/consts";

const Shop = () => {
  const history = useHistory();

  return (
      <Container>
      <input
        className="form-control input-find mt-3"
        placeholder="Начните вводить название для поиска"
        onChange={(event) => console.log(event.target.value)}
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
          hasCategories={history.location.state?.hasCategories}
          gamesIds={history.location.state?.games ? history.location.state.games.map(item => item.categoryId) : [] }
      />
    </Container>
  );
};

export default Shop;
