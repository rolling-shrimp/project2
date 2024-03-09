import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "../assets/search/search.css";
import CreateAndEddit from "./CreateAndEddit";
import IconAndTile from "../Static_Components/IconAndTile";
import AddingButton from "../Static_Components/AddingButton";
import InputSearchArea from "./InputSearchArea";
import DateSearch from "./DateSearch";
const Search = ({ isOrder }) => {
  const [open, setOpen] = useState(false);
  const [thedate, setTheDate] = useState({ startDate: "", endDate: "" });
  const [redoDisable, setRedoDisable] = useState(true);
  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Row
        style={{ backgroundColor: " rgb(181, 181, 181)" }}
        className="headerSticky"
      >
        <Col
          className="title d-flex flex-row align-items-center justify-content-center"
          md={2}
        >
          {isOrder ? (
            <CreateAndEddit
              setOpen={setOpen}
              open={open}
              type="新增"
              id={null}
              singleData={null}
            />
          ) : (
            <CreateAndEddit
              setOpen={setOpen}
              open={open}
              type="新增"
              id={null}
              singleData={null}
            />
          )}
          <IconAndTile isOrder={isOrder} />
        </Col>
        <Col md={8} xs={0}></Col>
        <Col md={2} className=" p-2">
          <AddingButton isOrder={isOrder} openModal={openModal} />
        </Col>
      </Row>
      <Row
        style={{ backgroundColor: " rgb(181, 181, 181)" }}
        className="inputArea inputAreaSticky"
      >
        <Col md={1} xs={0}></Col>
        <Col
          md={5}
          className="colCoverInput   d-flex flex-row  align-items-center justify-content-start"
        >
          <InputSearchArea
            isOrder={isOrder}
            setTheDate={setTheDate}
            thedate={thedate}
            setRedoDisable={setRedoDisable}
            redoDisable={redoDisable}
          />
        </Col>
        {isOrder === false ? (
          <Col md={5}></Col>
        ) : (
          <Col
            className="colCoverInput d-flex flex-row align-items-center justify-content-start"
            md={5}
          >
            <DateSearch
              thedate={thedate}
              setTheDate={setTheDate}
              setRedoDisable={setRedoDisable}
              redoDisable={redoDisable}
            />
          </Col>
        )}

        <Col md={1} xs={0}></Col>
      </Row>
    </>
  );
};

export default Search;
