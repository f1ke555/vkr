import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";
import "../style/style.css";
import HorizontalScroll from "react-scroll-horizontal";
import { apiService } from "../services/api.service";
import { apiTransport } from "../transport/api.transport";


const DeviceList = observer(() => {
  const { device } = useContext(Context);

 const [games, setGames] = useState([]);

  useEffect(() => {
    apiTransport.getAllGames();
    apiService._allGames$.subscribe((games) => setGames(games));
  }, [])

  return (
    <div className="horizontal-scroll mt-3 d-flex justify-content-center">
      <HorizontalScroll style={{ height: "200px", width: "980px" }}>
        {games.map((device) => (
          <Row className="">
            <DeviceItem key={device.id} device={device} />
          </Row>
        ))}
      </HorizontalScroll>
    </div>
  );
});

export default DeviceList;
