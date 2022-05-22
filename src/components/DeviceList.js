import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import "../style/style.css";
import HorizontalScroll from "react-scroll-horizontal";
import { apiService } from "../services/api.service";
import { apiTransport } from "../transport/api.transport";


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

  return (
    <div className="horizontal-scroll mt-3 d-flex justify-content-center">
      <HorizontalScroll style={{ height: "200px", width: "980px" }} reverseScroll pageLock>
        {filteredGames && filteredGames.map((device) => (
          <Row className="" onClick={() => void apiTransport.setViewCountIntoGame(device.id, 1)}>
            <DeviceItem key={device.id} device={device} />
          </Row>
        ))}
      </HorizontalScroll>
    </div>
  );
};

export default DeviceList;
