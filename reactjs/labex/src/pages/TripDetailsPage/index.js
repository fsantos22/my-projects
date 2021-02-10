import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
} from "react-router-dom";

import { baseEndpoint } from "./../../components/GlobalInformations";
// import { TripsContainer, SideMenu, Content } from "./styled";
import {
  Background,
  Button,
  BackButton,
  TripsContainer,
  SideMenu,
  Content,
  Icon,
  DropMenu,
} from "../../components/globalStyles";

import Details from "./Details";
import { useProtectedPage } from "./../../components/hooks/useProtectedPage";
import bg from "../../images/standardBG.jpg"
import { FaBars } from "react-icons/fa";
import loadingGif from "../../images/loading.svg";


const TripDetailsPage = () => {
  useProtectedPage();
  const history = useHistory();

  const goBack = () => {
    history.push("/admin");
  };

  const [trips, setTrips] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const getAllTrips = async () => {
    try {
      const res = await axios.get(`${baseEndpoint}/trips`);
      setTrips(res.data.trips);
      setLoading(false)
    } catch (err) {
      alert(err);
      setLoading(false);
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
        {loading ? (
          <div className="loading">
            <img src={loadingGif} />
          </div>
        ) : (
          <>
            {trips.map((trip) => {
              return (
                <div className="item" key={trip.id}>
                  <ul>
                    <li>
                      <Link to={`/trips/details/${trip.id}`}>{trip.name}</Link>
                    </li>
                  </ul>
                </div>
              );
            })}
          </>
        )}
      </DropMenu>

      <TripsContainer>
        <SideMenu>
          <h1>VIAGEM</h1>
          <hr />
          {loading ? (
            <div className="loading">
              <img src={loadingGif} />
            </div>
          ) : (
            <>
              {trips.map((trip) => {
                return (
                  <div className="item" key={trip.id}>
                    <ul>
                      <li>
                        <Link to={`/trips/details/${trip.id}`}>
                          {trip.name}
                        </Link>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </>
          )}
        </SideMenu>

        <Content>
          <Switch>
            <Route
              path="/trips/details/:id"
              children={<Details trips={trips} getAllTrips={getAllTrips} />}
            />
          </Switch>
        </Content>
      </TripsContainer>
    </Router>
  );
};

export default TripDetailsPage;
