import { useState, createContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Interface from "./pages/Interface";
import CheckData from "./components/CheckData";

import "./assets/common/comonItem.css";
import "bootstrap/dist/css/bootstrap.min.css";
export const Thecontex = createContext();
function App() {
  const CustinputArr = [
    "CustID",
    "Name",
    "Country",
    "State",
    "Zip",
    "City",
    "Address",
    "Status",
  ];

  const OrderinputArr = [
    "OrderID",
    "CustID",
    "TotalAmount",
    "OrdStatus",
    "SalesName",
  ];
  const [isOrder, setIsOrder] = useState(false);
  const [open, setOpen] = useState(false);
  const changePage = (type) => {
    setIsOrder(type);
  };

  return (
    <div className="App">
      <Container fluid>
        <Row className="switchHeader">
          <Col md={2} className="switchFirstColumn"></Col>
          <Col md={4}></Col>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-evenly  p-2 "
          >
            <button
              className="button mt-2 mb-2"
              style={
                !isOrder
                  ? {
                      backgroundColor: "white",
                      color: "rgb(5, 13, 83)",
                    }
                  : {}
              }
              type="button"
              disabled={!isOrder}
              onClick={() => {
                changePage(false);
              }}
            >
              客戶資料
            </button>
            <button
              style={
                isOrder
                  ? {
                      backgroundColor: "white",
                      color: "rgb(5, 13, 83)",
                    }
                  : {}
              }
              className="button mb-1"
              disabled={isOrder}
              type="button"
              onClick={() => {
                changePage(true);
              }}
            >
              訂單資料
            </button>
          </Col>
        </Row>
      </Container>
      <Thecontex.Provider
        value={{
          CustinputArr,
          OrderinputArr,
          setDetailDataOpen: setOpen,
        }}
      >
        {isOrder ? (
          <Interface
            key="orderInterface"
            isOrder={isOrder}
            changePage={changePage}
          />
        ) : (
          <Interface
            key="customerInterface"
            isOrder={isOrder}
            changePage={changePage}
          />
        )}

        <CheckData
          CustinputArr={CustinputArr}
          key={open}
          theId={open}
          isOrder={isOrder}
          setOpen={setOpen}
          open={open}
        />
      </Thecontex.Provider>
    </div>
  );
}

export default App;
