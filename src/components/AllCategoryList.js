import React from "react";
import { Col, Row } from "react-bootstrap";
import "../style/style.css";
import AllCategoryItem from "./AllCategoryItem";
import {ALLGAME_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";

const AllCategoryList = (props) => {
  const history = useHistory()
  const handleClick = (name, games) => {
    history.push(ALLGAME_ROUTE, {hasCategories: true, name, games})
  }
  const { categories } = props;

  return (
    <Row>
        {categories.map((type) => (
          <Col
          className="col-md-3 pt-4"
          style={{ cursor: "pointer"}}
          key={type.id}
          onClick={handleClick.bind(null, type.name, type.games)}
          >
          <AllCategoryItem key={type.id} type={type} />
          </Col>
        ))}
    </Row>
  );
};

export default AllCategoryList;