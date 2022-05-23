import React from "react";
import { Card, Col } from "react-bootstrap";

const AllCategoryItem = ({ type }) => {
  return (
      <Card style={{ width: "300px", height: "200px", cursor: "pointer" }}>
          <div style={{paddingTop: '30px'}}>
              <img
                  style={{margin: '0 auto'}}
                  className="d-flex justify-content-center"
                  src={`/categoryCards/${type.name}.png`}
                  height="90px"
                  width="100px"
              />
              <div style={{textAlign: 'center', fontSize: '16px', fontWeight: '700', lineHeight: '110%'}} className="pt-4">{type.name}</div>
          </div>
      </Card>
  );
};

export default AllCategoryItem;