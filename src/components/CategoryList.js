import React, {useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import "../style/style.css";
import HorizontalScroll from "react-scroll-horizontal";
import CategoryItem from "./CategoryItem";
import {apiTransport} from "../transport/api.transport";
import {ALLGAME_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]); // id, name, games
    const history = useHistory();
  useEffect(() => {
      apiTransport.getAllCategories()
          .then(response => setCategories(response.data));
  }, [])

    const handleClick = (name, games) => {
        history.push(ALLGAME_ROUTE, { hasCategories: true, name, games })
    }
  return (
    <div
        className="horizontal-scroll mt-3 d-flex justify-content-center">
      <HorizontalScroll style={{ height: "200px", width: "970px" }}>
        {categories && categories.map((type) => (
          <Row
            className="main"
            style={{ cursor: "pointer" }}
            key={type.id}
            onClick={handleClick.bind(null, type.name, type.games)}
          >
            <CategoryItem key={type.id} type={type} />
          </Row>
        ))}
      </HorizontalScroll>
    </div>
  );
};

export default CategoryList;
