import React from "react";
import { ListGroup, Table } from "react-bootstrap";
import "../assets/custDataOne/custDataOnes.css";
const SingleData = ({ dataToRender, version }) => {
  if (version === "cust") {
    const { CustID, Name, Country, State, Zip, City, Address, Status } =
      dataToRender;
    return (
      <ListGroup>
        <ListGroup.Item className="p-1 ">
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
        <div
          style={{ height: "100%", backgroundColor: "rgb(5, 13, 83)" }}
          className="d-flex flex-row justify-content-center align-items-center "
        >
          <h6 className="p-2  text-white">訂單資料尚未新增</h6>
        </div>
      );
    }
    return (
      <Table
        style={{ backgroundColor: "rgb(5, 13, 83)" }}
        className="insideCustOrd"
      >
        <tbody style={{ backgroundColor: "rgb(5, 13, 83)" }}>
          {dataToRender.map((item) => (
            <tr className="mt-1 d-flex flex-column" key={item.OrderID}>
              <td> order id:&nbsp;{item.OrderID} </td>{" "}
              <td> amount:&nbsp;{item.TotalAmount}</td>{" "}
              <td>date:&nbsp;{item.OrderDate.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
};

export default SingleData;
