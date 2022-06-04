import React, { useEffect, useRef, useState} from "react";
import "../style/style.css";
import CategoryItem from "./CategoryItem"
import {apiTransport} from "../transport/api.transport";
import {ALLGAME_ROUTE} from "../utils/consts";
import {useHistory} from "react-router-dom";
import lineleft from "../assets/lineleft.svg";
import lineright from "../assets/lineright.png";
import $ from 'jquery';

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

    const scroll = useRef(null);
    const mainComponent = useRef(null);

    const handleWheel = (e) => {
        scroll.current.scrollLeft += +e.deltaY;
    }

    const slider = useRef(null)

    let position = 0

    const prevHandler = () => {
        if (position === 0) {
            position = 0
        } else {
            position += 195;
            scroll.current.childNodes.forEach((element) => {
                element.style = `transform: translateX(${position}px)`
            })
        }
    }

    const nextHandler = () => {
      if (position === 0 || (position > (-filteredCategories.length - 4 * 195 ))) {
          position -= 195;
          scroll.current.childNodes.forEach((element) => {
              element.style = `transform: translateX(${position}px)`
          })
      }
    }

    const onMouseLeave = () => {
        $('body').removeClass('disable-scroll')
    }

    const onMouseEnter = (e) => {
      console.log(e);
        $('body').addClass('disable-scroll')
    }

  return (
    <div
        className="mt-3 d-flex justify-content-center" tabIndex="0">
        <div style={{position: "relative"}}>
            <div onClick={prevHandler} className="knopkagame">
                <img className="arrow-scroll" src={lineleft}/>
            </div>
            <div onClick={nextHandler} className="knopkaright">
                <img className="arrow-scroll" src={lineright}/>
            </div>
        </div>
        <div onWheel={handleWheel} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} ref={scroll} className="custom-slider">
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
