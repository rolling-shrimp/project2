import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Thecontex } from "../App";

import axiosFun from "../AxiosFun/axiosFun";
const EditOrd = () => {
  const theItem = useContext(Thecontex);
  const ordinputNotmem = theItem.OrderinputArr;
  const ordinput = useMemo(() => {
    return ordinputNotmem.slice(1);
  }, []);

  const { id } = useParams();

  let Ord = theItem.OrderinputArr.reduce(
    (acc, cur) => ({ ...acc, [cur]: "" }),
    {}
  );

  const [orddetail, setorddetail] = useState(Ord);

  const changeOrdValue = (e) => {
    let { value, name } = e.target;
    setorddetail({ ...orddetail, [name]: value });
  };

  const searchOrdCallback = useCallback(() => {
    const searchOrdItem = async () => {
      try {
        let respone = await axiosFun.get(`http://localhost:3503/ordEdit/${id}`);
        let ordStuff = respone.data[0];
        setorddetail({
          ...orddetail,
          OrderID: ordStuff.ID,
          Customer_ID: ordStuff.Customer_ID,
          TotalAmount: ordStuff.TotalAmount,
          OrdStatus: ordStuff.Status,
          SalesName: ordStuff.Sales_Name,
          Date: ordStuff.Order_Date,
        });
      } catch (e) {
        console.log(e);
      }
    };
    searchOrdItem();
  }, []);
  const sendData = async () => {
    try {
      let response = await axiosFun.put(
        `http://localhost:3503/OrdEdit`,
        orddetail
      );
      console.log(response);
      alert("修改成功");
    } catch (e) {
      console.log(e);
      alert("failed to alter");
    }
  };

  useEffect(() => {
    searchOrdCallback();
  }, [searchOrdCallback]);

  return (
    <div className="creating d-flex flex-column justify-content-center align-items-center">
      <table>
        <thead>
          <tr>
            <th>OrderID</th>
            {ordinput.map((item) => (
              <th key={item}>{item}</th>
            ))}
            <th colSpan="4">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                value={orddetail.OrderID}
                onChange={changeOrdValue}
                name="OrderID"
              />
            </td>
            {ordinput.map((item) => (
              <td key={item}>
                <input
                  onChange={changeOrdValue}
                  value={orddetail[item]}
                  name={item}
                />
              </td>
            ))}
            <td key="Date" colSpan="4">
              {orddetail.Date}

              <input
                className="margin"
                type="date"
                onChange={changeOrdValue}
                name="Date"
                id=""
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className=" thepadding d-flex flex-row align-items-center justify-content-evenly">
        <button onClick={sendData}>確定</button>
        <button>
          <Link to={"/order"}>取消 </Link>
        </button>
      </div>
    </div>
  );
};

export default EditOrd;
