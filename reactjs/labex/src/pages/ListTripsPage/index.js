import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
} from "react-router-dom";

import {
  Background,
  Button,
  BackButton,
  TripsContainer,
  SideMenu,
  Content,
  Icon,
  DropMenu
} from "./../../components/globalStyles";

import { baseEndpoint } from "./../../components/GlobalInformations";
import Details from "./Details";
import { FaBars } from "react-icons/fa";

import bg from "../../images/standardBG.jpg";


const ListTripsPage = ({match}) => {
  const history = useHistory();

  const [trips, setTrips] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);

  const goBack = () => {
    history.push("/");
  };

  const getAllTrips = async () => {
    try {
      const res = await axios.get(`${baseEndpoint}/trips`);
      setTrips(res.data.trips);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getAllTrips();
  }, []);

  return (
    <Router>
      <Background img={bg} />
      <BackButton>
        <Button onClick={goBack}>Voltar ao Menu</Button>
      </BackButton>

      <Icon onClick={() => setOpenMenu(!openMenu)}>
        <FaBars />
      </Icon>

        <DropMenu openMenu={openMenu} onClick={() => setOpenMenu(!openMenu)}>
          <h1>VIAGEM</h1>
          <hr />
          {trips.map((trip) => {
            return (
              <div key={trip.id}>
                <ul>
                  <li>
                    <Link to={`/trips/list/${trip.id}`}>{trip.name}</Link>
                  </li>
                </ul>
              </div>
            );
          })}
        </DropMenu>


      <TripsContainer>
        <SideMenu>
          <h1>VIAGEM</h1>
          <hr />
          {trips.map((trip) => {
            return (
              <div key={trip.id}>
                <ul>
                  <li>
                    <Link to={`/trips/list/${trip.id}`}>{trip.name}</Link>
                  </li>
                </ul>
              </div>
            );
          })}
        </SideMenu>
        <Content>
          <Switch>
            <Route
              path="/trips/list/:id"
              children={<Details trips={trips} />}
            />
          </Switch>
        </Content>
      </TripsContainer>
    </Router>
  );
};

export default ListTripsPage;
