import React, {useEffect} from "react";
import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { GAME_ROUTE } from "../utils/consts";
import "../style/style.css";
import {Chip} from "@mui/material";
import views from "../assets/views.png"

const DeviceItem = ({ device }) => {
  const history = useHistory();
  return (
    <Col onClick={() => history.push(GAME_ROUTE + "/" + device.id, { gameInfo: device })}>
      <Card style={{ width: "228px", height: "147px", cursor: "pointer", marginRight: "19px" }}>
          <div className="first" style={{position: 'relative'}}>
              <img
                  style={{borderRadius: '7px'}}
                  src={`/gameCards/${device.name}.png`}
                  height="147px"
                  width="228px"
              />
              <div style={{position: 'absolute', top: '110px', left: '10px'}}>
                  { device.competencies && device.competencies.map((item) => {
                      return (
                          <Chip className="custom-chip color-chip" label={item.name} />
                      )
                  })}
              </div>

              <div className="main-category-views">
                  {device.views + 1}
                  <div>
                      <img className="icon-views" src={views}/>
                  </div>
              </div>
          </div>
          <div className="fourth back-card-game">
              <div style={{paddingTop: '3px', paddingLeft: "10px", fontSize: '16px'}}>{device.name}</div>
              <div style={{paddingLeft: "10px", fontSize: '14px', fontWeight: '400'}}>{device.description}</div>
          </div>

      </Card>
    </Col>
  );
};

export default DeviceItem;
