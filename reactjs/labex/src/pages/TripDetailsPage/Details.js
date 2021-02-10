import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseEndpoint, auth } from "./../../components/GlobalInformations";
import { useProtectedPage } from "./../../components/hooks/useProtectedPage";
import { DetailsContainer, Button } from "./../../components/globalStyles";
import { ButtonBox } from "./styled";
import loadingGif from "../../images/loading.svg"

import Confirm from "../../components/Alert/Confirm";
import Alert from './../../components/Alert/Alert';

export default function Details(props) {
  useProtectedPage();
  let { id } = useParams();

  let currentTrip = props.trips.filter((trip) => {
    return trip.id === id;
  });

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true)

  const [alertDelete, setAlertDelete] = useState(false);
  const [alertApprove, setAlertApprove] = useState(false)
  const [alertRefuse, setAlertRefuse] = useState(false);

  const getTripDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseEndpoint}/trip/${id}`, auth);
      setCandidates(res.data.trip.candidates);
      setLoading(false)
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTripDetails();
  }, [id]);

  const deleteTrip = () => {
    axios
      .delete(`${baseEndpoint}/trips/${id}`)
      .then((res) => {
        props.getAllTrips();
        setAlertDelete(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const approveCandidate = (candidate) => {
    const body = { approve: true };
    axios
      .put(
        `${baseEndpoint}/trips/${id}/candidates/${candidate}/decide`,
        body,
        auth
      )
      .then((res) => {
        getTripDetails();
        setAlertApprove(true)
      })
      .catch((err) => {
        alert(err);
      });
  };

  const refuseCandidate = (candidate) => {
    const body = { approve: false };
    axios
      .put(
        `${baseEndpoint}/trips/${id}/candidates/${candidate}/decide`,
        body,
        auth
      )
      .then((res) => {
        getTripDetails();
        setAlertRefuse(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <Alert
        title="EXCLUSÃO DE VIAGEM"
        description="A viagem foi excluída com sucesso!"
        alert={alertDelete}
        setAlert={setAlertDelete}
      />
      <Alert
        title="CANDIDATURA"
        description={
          alertApprove
            ? "A candidatura foi aprovada com sucesso!"
            : "A candidatura foi rejeitada com sucesso!"
        }
        alert={alertApprove ? alertApprove : alertRefuse}
        setAlert={alertApprove ? setAlertApprove : setAlertRefuse}
      />
      <Confirm
        title="CONFIRMAÇÃO"
        description="Tem certeza que deseja prosseguir com a operação?"
      >
        {(confirm) => (
          <>
            <DetailsContainer trips={currentTrip.length}>
              {currentTrip.length > 0 && (
                <>
                  <div className="container">
                    <div className="label">
                      <span>Nome: </span>
                    </div>
                    <div>{currentTrip[0].name}</div>
                  </div>
                  <div className="container">
                    <div className="label">
                      <div>
                        <span>Planeta: </span>
                      </div>
                    </div>
                    {currentTrip[0].planet}
                  </div>
                  <div className="container">
                    <div className="label">
                      <span>Data: </span>
                    </div>
                    <div>{currentTrip[0].date}</div>
                  </div>
                  <div className="container">
                    <div className="label">
                      <span>Duração: </span>
                    </div>
                    {currentTrip[0].durationInDays} dias
                  </div>
                  <div className="container">
                    <div className="label">
                      <span>Descrição: </span>
                    </div>
                    <div>{currentTrip[0].description}</div>
                  </div>
                  <Button onClick={confirm(deleteTrip)}>EXCLUIR VIAGEM</Button>
                  <hr />
                </>
              )}
              {loading ? (
                <div className="loading">
                  <img src={loadingGif} />
                </div>
              ) : (
                <>
                  <h1>Candidatos</h1>
                  {candidates.length > 0 && (
                    <>
                      {candidates.map((candidate) => {
                        return (
                          <div key={candidate.id}>
                            <div className="container">
                              <div className="label">
                                <span>Nome: </span>
                              </div>
                              <div>{candidate.name}</div>
                            </div>
                            <div className="container">
                              <div className="label">
                                <span>Idade: </span>
                              </div>
                              <div>{candidate.age}</div>
                            </div>
                            <div className="container">
                              <div className="label">
                                <span>País: </span>
                              </div>
                              <div>{candidate.country}</div>
                            </div>
                            <div className="container">
                              <div className="label">
                                <span>Profissão: </span>
                              </div>
                              <div>{candidate.profession}</div>
                            </div>
                            <div className="container">
                              <div className="label">
                                <span>Motivação: </span>
                              </div>
                              <div>{candidate.applicationText}</div>
                            </div>

                            <ButtonBox>
                              <Button
                                width="100%"
                                onClick={() => approveCandidate(candidate.id)}
                              >
                                APROVAR
                              </Button>
                              <Button
                                width="100%"
                                onClick={() => refuseCandidate(candidate.id)}
                              >
                                REJEITAR
                              </Button>
                            </ButtonBox>
                            <hr />
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </DetailsContainer>
          </>
        )}
      </Confirm>
    </>
  );
}
