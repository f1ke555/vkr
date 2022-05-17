import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import "../style/style.css";
import { apiService } from "../services/api.service";
import { apiTransport } from "../transport/api.transport";
import AllGameItem from "./AllGameItem";
import {useHistory} from "react-router-dom";


const AllGameList = (props) => {
 const [games, setGames] = useState([]);
 const { hasCategories, gamesIds } = props;
 const [filteredGames, setFilteredGames] = useState([]);

 const history = useHistory();

  useEffect(() => {
      if (hasCategories || history.location.state?.hasCategories) {
          void apiTransport.getAllGames(true, gamesIds);
      } else {
          void apiTransport.getAllGames(false);
      }
  }, [gamesIds, hasCategories])

  useEffect(() => {
      apiService._allGames$.subscribe((games) => setGames([...games]));
  }, []);

    useEffect(() => {
        const filterArray = games.filter((item) => item.name.includes(props.searchText));
        setFilteredGames(filterArray)
    }, [props.searchText, games])
  return (
      <Row>
        {filteredGames && filteredGames.map((device) => (
              <Col className="col-md-6 pt-4">
                <AllGameItem key={device.id} device={device} />
              </Col>
        ))}
      </Row>
  );
};

export default AllGameList;
