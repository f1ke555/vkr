import React, {useCallback, useEffect, useRef, useState} from "react";
import "../style/style.css";
import CategoryItem from "./CategoryItem"
import {apiTransport} from "../transport/api.transport";
import {ALLGAME_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";

const CategoryList = (props) => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

    const history = useHistory();
  useEffect(() => {
      apiTransport.getAllCategories()
          .then(response => setCategories(response.data));
  }, [])

    useEffect(() => {
        const filterArray = categories.filter((item) => item.name.includes(props.searchText));
        setFilteredCategories(filterArray)
    }, [props.searchText, categories])


    const handleClick = (name, games) => {
        history.push(ALLGAME_ROUTE, { hasCategories: true, name, games })
    }

    const scroll = useRef(null)
    const handleWheel = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        e.stopPropagation()
        scroll.current.scrollLeft += e.deltaY;
    }
  return (
    <div
        className="mt-3 d-flex justify-content-center">
        <div onWheel={handleWheel} ref={scroll} className="custom-slider">
            {filteredCategories && filteredCategories.map((type) => (
                <div
                    className="main"
                    style={{ cursor: "pointer" }}
                    key={type.id}
                    onClick={handleClick.bind(null, type.name, type.games)}
                >
                    <CategoryItem key={type.id} type={type} />
                </div>
            ))}
        </div>
    </div>
  );
};

export default CategoryList;
