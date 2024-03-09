import React, { useState } from "react";
import { Form } from "react-bootstrap";
const AddOrderData = ({
  theInputLabel,
  handleChange,
  values,
  errors,
  type,
  singleData,
}) => {
  const [inputType, setInputType] = useState("text");
  const focus = () => {
    setInputType("date");
  };
  const blur = () => {
    setInputType("text");
  };
  return (
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
          type={inputType}
          name="OrderDate"
          placeholder="OrderDate"
          onChange={handleChange}
          onFocus={focus}
          onBlur={blur}
          value={values.hasOwnProperty("OrderDate") ? values.OrderDate : ""}
          isInvalid={!!errors.OrderDate}
        />
        <Form.Control.Feedback type="invalid">
          {errors.OrderDate}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default AddOrderData;
