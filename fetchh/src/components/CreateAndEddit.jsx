import React, { useContext } from "react";
import { Modal, Form, Container, Col, Row } from "react-bootstrap";
import { Formik } from "formik";
import {
  createNewData,
  editData,
  redoAfterCreatEddit,
} from "../eventHandler/eventHandling";
import {
  createCustomer,
  createOrder,
  editCustomer,
  editOrder,
} from "../reactValidate/validate";
import AxiosFun from "../AxiosFun/axiosFun";
import "../assets/search/search.css";
import { Thecontex } from "../App";
import { ProvideData } from "../pages/Interface";

const CreateAndEddit = ({ setOpen, open, type, id, singleData }) => {
  const { basicUrl, setToRender, isOrder, setCompareWhithQuery } =
    useContext(ProvideData);
  const theInputLabel = isOrder
    ? useContext(Thecontex).OrderinputArr
    : useContext(Thecontex).CustinputArr;

  let validateSchema;

  if (type === "新增" && isOrder === false) {
    validateSchema = createCustomer;
  } else if (type === "新增" && isOrder === true) {
    validateSchema = createOrder;
  } else if (type === "修改" && isOrder === false) {
    validateSchema = editCustomer;
  } else if (type === "修改" && isOrder === true) {
    validateSchema = editOrder;
  }

  const close = () => {
    setOpen(false);
  };
  const Submit = (query, reset) => {
    type === "新增"
      ? createNewData(
          isOrder,
          query,
          basicUrl,
          redoAfterCreatEddit,
          AxiosFun,
          setToRender,
          setCompareWhithQuery,
          reset
        )
      : editData(
          id,
          query,
          isOrder,
          AxiosFun,
          basicUrl,
          redoAfterCreatEddit,
          setToRender,
          setCompareWhithQuery,
          reset
        );
  };
  return (
    <Modal show={open} onHide={close}>
      <Modal.Header
        style={{ backgroundColor: "rgb(5, 13, 83)", color: "white" }}
      >
        <Modal.Title>
          {type}
          {isOrder ? "訂單" : "客戶"}欄位
        </Modal.Title>
        <button style={{ marginLeft: "60%" }} onClick={close}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={validateSchema}
          onSubmit={(values, { resetForm }) => {
            Submit(values, resetForm);
          }}
          initialValues={{}}
        >
          {({ handleSubmit, handleChange, values, errors, resetForm }) => (
            <Form noValidate onSubmit={handleSubmit}>
              {isOrder ? (
                <>
                  {theInputLabel.map((item) => (
                    <Form.Group
                      key={item}
                      className="d-flex flex-column align-items-start mb-3"
                    >
                      <Form.Label>{item} </Form.Label>
                      <Form.Control
                        className="w-100 formElement"
                        type={item === "TotalAmount" ? "number" : "text"}
                        name={item}
                        placeholder={type === "修改" ? singleData[item] : item}
                        onChange={handleChange}
                        value={values.hasOwnProperty(item) ? values[item] : ""}
                        isInvalid={!!errors[item]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors[item]}
                      </Form.Control.Feedback>
                    </Form.Group>
                  ))}
                  <Form.Group
                    key="OrderDate"
                    className="d-flex flex-column align-items-start mb-3"
                  >
                    <Form.Label>OrderDate</Form.Label>
                    <Form.Control
                      className="w-100 formElement "
                      type="date"
                      name="OrderDate"
                      placeholder="OrderDate"
                      onChange={handleChange}
                      value={
                        values.hasOwnProperty("OrderDate")
                          ? values.OrderDate
                          : ""
                      }
                      isInvalid={!!errors.OrderDate}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.OrderDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                </>
              ) : (
                theInputLabel.map((item) => (
                  <Form.Group
                    key={item}
                    className="d-flex flex-column align-items-start mb-3"
                  >
                    <Form.Label>{item}</Form.Label>
                    <Form.Control
                      className="w-100 formElement "
                      name={item}
                      placeholder={type === "修改" ? singleData[item] : item}
                      onChange={handleChange}
                      value={values.hasOwnProperty(item) ? values[item] : ""}
                      isInvalid={!!errors[item]}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[item]}
                    </Form.Control.Feedback>
                  </Form.Group>
                ))
              )}
              <Form.Group>
                <Container>
                  <Row>
                    <Col></Col>
                    <Col md={6}>
                      {" "}
                      <button
                        className="inputAreabutton "
                        type="button"
                        onClick={resetForm}
                        style={{ marginRight: "1rem" }}
                      >
                        <i
                          style={{ marginRight: "0.5rem" }}
                          className="fa-solid fa-rotate-right"
                        ></i>
                        重設
                      </button>
                      <button className="inputAreabutton " type="submit">
                        {type === "修改" ? (
                          <i
                            style={{ marginRight: "0.5rem" }}
                            className="fa-regular fa-pen-to-square"
                          ></i>
                        ) : (
                          <i
                            style={{ marginRight: "0.5rem" }}
                            className="fa-solid fa-circle-plus"
                          ></i>
                        )}

                        {type}
                      </button>
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CreateAndEddit;
