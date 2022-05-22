import React from "react";
import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { GAME_ROUTE } from "../utils/consts";
import "../style/style.css";
import {Chip} from "@mui/material";
import views from "../assets/views.png";

const AllGameItem = ({ device }) => {
  const history = useHistory();
  return (
    <div onClick={() => history.push(GAME_ROUTE + "/" + device.id, { gameInfo: device })}>
      <div style={{ width: "300px", height: "200px", cursor: "pointer" }}>
        <div className="d-flex">
          <div style={{ position: "relative", display: "inline-block"}}>
            <img src={`/gameCards/${device.name}.png`} height="150px" width="270px" style={{marginLeft: '12px', marginTop: '10px'}}/>
            <div style={{position: 'absolute', top: "120px", left: '20px'}}>
              { device.competencies && device.competencies.map((item) => {
                return (
                    <Chip className="custom-chip color-chip" label={item.name} />
                )
              })}
            </div>
            <div className="card-views">
              {device.views}
              <div>
                <img className="icon-views" src={views}/>
              </div>
            </div>
          </div>
          <div>
            <div className="color-text pt-2">{device.name}</div>
            <h5 className="align-self-center description">{device.description}</h5>
          </div>
        </div>

        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default AllGameItem;