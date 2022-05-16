import React from "react";
import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import "../style/style.css";

const DeviceItem = ({ device }) => {
  console.log(device);
  const history = useHistory();
  return (
    <Col md={4} onClick={() => history.push(DEVICE_ROUTE + "/" + device.id, { gameInfo: device })}>
      <Card style={{ width: "228px", height: "147px", cursor: "pointer", marginRight: "19px" }}>
        <img
            src={`/gameCards/${device.name}.png`}
            height="147px"
            width="228px"
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center"></div>
        </div>
        <div className="d-flex justify-content-center">{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
