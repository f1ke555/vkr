import React, {useEffect, useState} from "react";
import { Col, Row } from "react-bootstrap";
import "../style/style.css";
import AllCategoryItem from "./AllCategoryItem";
import {ALLGAME_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";

const AllCategoryList = (props) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const history = useHistory()
  const handleClick = (name, games) => {
    history.push(ALLGAME_ROUTE, {hasCategories: true, name, games})
  }


  const { categories } = props;

  useEffect(() => {
    const filterArray = categories.filter((item) => item.name.includes(props.searchText));
    setFilteredCategories(filterArray)
  }, [props.searchText, props.categories])
  return (
    <Row>
        {filteredCategories && filteredCategories.map((type) => (
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