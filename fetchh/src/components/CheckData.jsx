import React from "react";
import { Modal, Spinner, Container, Col, Row, Card } from "react-bootstrap";
import useFetchData from "../components/useFetchData";
import "../assets/custDataOne/custDataOnes.css";
import SingleData from "./SingleData";
const CheckData = ({ open, setOpen, isOrder, theId }) => {
  const closeSingleData = () => {
    setOpen(false);
  };
  const resource = useFetchData(
    isOrder,
    theId,
    "https://crud-project-yh8x.onrender.com"
  );

  return (
    <Modal show={open} onHide={closeSingleData}>
      <Modal.Header
        style={{ backgroundColor: " rgb(5, 13, 83) ", color: "white" }}
      >
        <Modal.Title> 客戶詳細資料</Modal.Title>
        <button style={{ marginLeft: "60%" }} onClick={closeSingleData}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row className="mb-1">
            <Col>
              {" "}
              {resource ? (
                <Card style={{ backgroundColor: "#050d53", color: "white" }}>
                  <Card.Body>
                    <Card.Title>客戶資料</Card.Title>

                    <SingleData
                      dataToRender={resource.customerData}
                      version={"cust"}
                    />
                  </Card.Body>
                </Card>
              ) : (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              {resource ? (
                <Card
                  className="custDataOneSection"
                  style={{ backgroundColor: "#050d53", color: "white" }}
                >
                  <Card.Body>
                    <Card.Title>客戶詳細訂單資料</Card.Title>

                    <SingleData
                      dataToRender={resource.orderData}
                      version={"ord"}
                    />
                  </Card.Body>
                </Card>
              ) : (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default CheckData;
