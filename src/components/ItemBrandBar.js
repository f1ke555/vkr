import React, { useContext } from "react";
import { Card, Col } from "react-bootstrap";
import { Context } from "../index";

const ItemBrandBar = ({ brand }) => {
  const { device } = useContext(Context);
  return (
    <Col md={3}>
      <Card
        style={{ cursor: "pointer" }}
        key={brand.id}
        className="p-3"
        onClick={() => device.setSelectedBrand(brand)}
        border={brand.id === device.selectedBrand.id ? "danger" : "light"}
      >
        {brand.name}
      </Card>
    </Col>
  );
};

export default ItemBrandBar;
