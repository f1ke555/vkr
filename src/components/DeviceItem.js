import React from "react";
import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import "../style/style.css";
import {Chip} from "@mui/material";

const DeviceItem = ({ device }) => {
  console.log(device);
  const history = useHistory();
  return (
    <Col md={4} onClick={() => history.push(DEVICE_ROUTE + "/" + device.id, { gameInfo: device })}>
      <Card style={{ width: "228px", height: "147px", cursor: "pointer", marginRight: "19px" }}>
          <div className="first" style={{position: 'relative'}}>
              <img
                  src={`/gameCards/${device.name}.png`}
                  height="147px"
                  width="228px"
              />
              <Chip className="main-category-card" label={device.name}/>
              <div className="main-category-views">{device.views}</div>
          </div>
          <div className="fourth back-card-game">
              <h5 style={{paddingTop: '10px', paddingLeft: "10px"}}>{device.name}</h5>
              <h6 style={{paddingLeft: "10px"}}>{device.description}</h6>
          </div>

      </Card>
    </Col>
  );
};

export default DeviceItem;
