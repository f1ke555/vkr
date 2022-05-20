import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AllCategoryList from "../components/AllCategoryList";
import {apiTransport} from "../transport/api.transport";
import {useHistory} from "react-router-dom";
import {ALLGAME_ROUTE} from "../utils/consts";
import input_find from "../assets/input_find.png";

const Category = () => {
    const [searchText, setSearchText] = useState('');
    const handleChange = (event) => {
        setSearchText(event.target.value);
    }
  const [categories, setCategories] = useState([]); // id, name, games
    const history = useHistory()
  useEffect(() => {
    apiTransport.getAllCategories()
        .then(response => setCategories(response.data) );
  }, [])

  return (
      <Container>
          <div style={{position: "relative"}}>
              <div style={{position: "absolute", left: '8px', top: '8px'}} className=""><img src={input_find}></img></div>
              <input
                  className="form-control input-find input-category"
                  placeholder="Начните вводить название для поиска"
                  onChange={handleChange}
              />
          </div>
          <div className="d-flex justify-content-between">
              <h2 className="mt-5">Категории</h2>
              <button
                  onClick={() => history.push(ALLGAME_ROUTE)}
                  className="btn-category">
                  Показать католог игр
              </button>
          </div>
      <AllCategoryList categories={categories} searchText={searchText}/>
    </Container>
      
  );
};

export default Category;