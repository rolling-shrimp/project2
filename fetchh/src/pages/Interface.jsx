import React, { useState, createContext } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import AxiosFun from "../AxiosFun/axiosFun";
import Search from "../components/Search";
import Show from "../components/Show";
import useFetchData from "../components/useFetchData";
import "../assets/interface/interface.css";

export const ProvideData = createContext();
const Interface = ({ isOrder, changePage }) => {
  const [toRender, compareWhithQuery, setToRender, setCompareWhithQuery] =
    useFetchData(isOrder, null, "https://crud-project-yh8x.onrender.com");

  const [basicUrl /* ignored */] = useState(
    "https://crud-project-yh8x.onrender.com"
  );
  const [eachPageAmount /* ignored */] = useState(5);
  const redo = async (disableRedo, clearDate, date) => {
    disableRedo(true);
    let [startDate, endDate] = Object.keys(date);

    clearDate({ ...date, [startDate]: "", [endDate]: "" });
    let url;
    isOrder
      ? (url = `${basicUrl}/OrdDataAll`)
      : (url = `${basicUrl}/CustDataAll`);
    try {
      let response = await AxiosFun.getOnly(url);

      setToRender(response.data);
      setCompareWhithQuery(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container fluid className="interface">
      <ProvideData.Provider
        value={{
          basicUrl,
          setToRender,
          setCompareWhithQuery,
          isOrder,
          compareWhithQuery,
        }}
      >
        <Search
          basicUrl={basicUrl}
          setToRender={setToRender}
          isOrder={isOrder}
          toRender={toRender}
          redo={redo}
          changePage={changePage}
          setCompareWhithQuery={setCompareWhithQuery}
          compareWhithQuery={compareWhithQuery}
        />
      </ProvideData.Provider>
      {!toRender ? (
        <Row>
          <Col md={4}></Col>
          <Col
            className="d-flex flex-column align-items-center justify-content-center h-50"
            md={4}
          >
            <h3>
              {" "}
              後端api是架設在免費的server上，會有server休眠時間，大概一分鐘，請耐心等候
            </h3>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
          <Col md={4}></Col>
        </Row>
      ) : (
        <ProvideData.Provider
          value={{
            basicUrl,
            redo,
            isOrder,
            data: toRender,
            setToRender,
            setCompareWhithQuery,
          }}
        >
          <Show
            key="order"
            eachPageAmount={eachPageAmount}
            data={toRender}
            isOrder={isOrder}
            redo={redo}
          />
        </ProvideData.Provider>
      )}
    </Container>
  );
};

export default Interface;
