import React from "react";
import { Card, Col } from "react-bootstrap";

const CategoryItem = ({ type }) => {
  return (
    <div>
      <Card style={{ width: "176px", height: "200px", cursor: "pointer", marginRight: "19px" }}>
        <div className="d-flex justify-content-center">{type.name}</div>
      </Card>
    </div>
  );
};

export default CategoryItem;
