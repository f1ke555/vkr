import React from "react";
import { Card, Col } from "react-bootstrap";

const AllCategoryItem = ({ type }) => {
  return (
      <Card style={{ width: "300px", height: "200px", cursor: "pointer" }}>
        <div className="d-flex justify-content-center">{type.name}</div>
      </Card>
  );
};

export default AllCategoryItem;