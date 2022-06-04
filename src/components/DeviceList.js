import React, {useContext, useEffect, useRef, useState} from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import "../style/style.css";
import HorizontalScroll from "react-scroll-horizontal";
import { apiService } from "../services/api.service";
import { apiTransport } from "../transport/api.transport";
import $ from "jquery";
import lineleft from "../assets/lineleft.svg";
import lineright from "../assets/lineright.png";


const DeviceList = (props) => {

 const [games, setGames] = useState([]);
 const [filteredGames, setFilteredGames] = useState([]);

    useEffect(() => {
        const filterArray = games.filter((item) => item.name.includes(props.searchText));
        setFilteredGames(filterArray)
    }, [props.searchText, games])

  useEffect(() => {
    apiTransport.getAllGames();
    apiService._allGames$.subscribe((games) => setGames(games));
  }, [])

    const scroll = useRef()
    const handleWheel = (e) => {
        e.preventDefault();
        scroll.current.scrollLeft += e.deltaY;
    }

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
        if (position === 0 || (position > (-filteredGames.length - 4 * 195 ))) {
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
    <div className="horizontal-scroll mt-3 d-flex justify-content-center">
        <div style={{position: "relative"}}>
            <div onClick={prevHandler} className="knopka">
                <img className="arrow-scroll" src={lineleft}/>
            </div>
            <div onClick={nextHandler} className="knopkagameright">
                <img className="arrow-scroll" src={lineright}/>
            </div>
        </div>
      <div onWheel={handleWheel} ref={scroll} className="custom-slider" style={{ height: "200px", width: "980px" }}>
        {filteredGames && filteredGames.map((device) => (
          <Row className="" onClick={() => void apiTransport.setViewCountIntoGame(device.id, 1)}>
            <DeviceItem key={device.id} device={device} />
          </Row>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
