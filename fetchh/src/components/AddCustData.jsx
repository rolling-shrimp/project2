import React from "react";
import { Form } from "react-bootstrap";

const AddCustData = ({
  theInputLabel,
  handleChange,
  values,
  errors,
  type,
  singleData,
}) => {
  return (
    <>
      {theInputLabel.map((item) => (
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
      ))}
    </>
  );
};

export default AddCustData;
