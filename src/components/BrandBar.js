import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import ItemBrandBar from "./ItemBrandBar";


const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
       <Row className="d-flex">
           {device.brands.map(brand =>
               <ItemBrandBar key={brand.id} brand={brand}/>
           )}
       </Row>
   );
});

export default BrandBar;