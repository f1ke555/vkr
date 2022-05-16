import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import search_icon from "../assets/search_icon.png"
import AllCategoryList from "../components/AllCategoryList";
import {apiTransport} from "../transport/api.transport";
import {useHistory} from "react-router-dom";
import {ALLGAME_ROUTE} from "../utils/consts";

const Category = observer(() => {
  const [value, setValue] = useState('');
  const [categories, setCategories] = useState([]); // id, name, games
    const history = useHistory()
  useEffect(() => {
    apiTransport.getAllCategories()
        .then(response => setCategories(response.data) );
  }, [])

  return (
      <Container>
      <input
        className="form-control input-find mt-3"
        placeholder="Начните вводить название для поиска"
        onChange={(event) => setValue(event.target.value)}
      />
          <div className="d-flex justify-content-between">
              <h2 className="mt-5">Категории</h2>
              <button
                  onClick={() => history.push(ALLGAME_ROUTE)}
                  className="btn-category">
                  Показать католог игр
              </button>
          </div>
      <AllCategoryList categories={categories} />
    </Container>
      
  );
});

export default Category;