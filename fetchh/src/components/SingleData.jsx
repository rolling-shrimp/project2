import React from "react";
import { ListGroup } from "react-bootstrap";
import "../assets/custDataOne/custDataOnes.css";
const SingleData = ({ dataToRender, version }) => {
  if (version == "cust") {
    const { CustID, Name, Country, State, Zip, City, Address, Status } =
      dataToRender;
    return (
      <ListGroup className=" insideCustOrd  ">
        <ListGroup.Item className="p-2">
          customer ID:&nbsp; {CustID}
        </ListGroup.Item>
        <ListGroup.Item className="p-2">name:&nbsp; {Name}</ListGroup.Item>
        <ListGroup.Item className="p-2">
          country:&nbsp; {Country}
        </ListGroup.Item>
        <ListGroup.Item className="p-2">State:&nbsp; {State} </ListGroup.Item>
        <ListGroup.Item className="p-2">Zip:&nbsp; {Zip}</ListGroup.Item>
        <ListGroup.Item className="p-2">city:&nbsp; {City}</ListGroup.Item>
        <ListGroup.Item className="p-2">status:&nbsp; {Status}</ListGroup.Item>
        <ListGroup.Item className="p-2">
          address:&nbsp; {Address}
        </ListGroup.Item>
      </ListGroup>
    );
  } else {
    if (dataToRender.length === 0) {
      return (
        <div className="d-flex flex-row justify-content-center insideCustOrd">
          <h3 className="p-2  text-white">訂單資料尚未新增</h3>
        </div>
      );
    }
    return (
      <ListGroup className="insideCustOrd">
        {dataToRender.map((item) => (
          <ListGroup.Item key={item.OrderID} className=" p-1 insideCustOrd">
            <p className="p-2">order id:&nbsp; {item.OrderID}</p>
            <p className="p-2">amount:&nbsp; {item.TotalAmount}</p>
            <p className="p-2">date:&nbsp; {item.OrderDate.split("T")[0]}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
};

export default SingleData;
