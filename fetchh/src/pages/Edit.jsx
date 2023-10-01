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
const Edit = () => {
  const theItem = useContext(Thecontex);
  const custinputNotmem = theItem.CustinputArr;

  const custinput = useMemo(() => {
    return custinputNotmem.slice(1);
  }, []);

  const { id } = useParams();

  let Cust = theItem.CustinputArr.reduce(
    (acc, cur) => ({ ...acc, [cur]: "" }),
    {}
  );

  const [editCust, seteditCust] = useState(Cust);

  const changingValue = (e) => {
    let { value, name } = e.target;
    seteditCust({ ...editCust, [name]: value });
  };

  const searchCustcallback = useCallback(() => {
    const searchCustItem = async () => {
      try {
        let response = await axiosFun.get(
          `http://localhost:3503/custEdit/${id}`
        );
        let stuff = response.data[0];

        // let stuffARR = Object.entries(stuff);
        // seteditCust((prev) => {
        //   return stuffARR.reduce((acc, [key, value]) => {
        //     return { ...acc, [prev[key]]: value };
        //   }, {});
        // });
        seteditCust({
          ...editCust,

          UID: stuff.UID,
          CustID: stuff.ID,
          Name: stuff.Name,
          Country: stuff.Country,
          State: stuff.State,

          Zip: stuff.Zip,

          City: stuff.City,

          Address: stuff.Address,
          Status: stuff.Status,
        });
      } catch (e) {
        console.log(e);
      }
    };

    searchCustItem();
  }, []);
  const sendData = async () => {
    try {
      let response = await axiosFun.put(
        `http://localhost:3503/CustEdit/`,
        editCust
      );
      console.log(response);
      alert("修改成功");
    } catch (e) {
      console.log(e);
      alert("failed to alter");
    }
  };

  useEffect(() => {
    searchCustcallback();
  }, [searchCustcallback]);

  return (
    <div className="creating d-flex flex-column justify-content-center align-items-center">
      {theItem.custpath && (
        <table>
          <thead>
            <tr>
              <th>UID</th>
              {custinput.map((item) => (
                <th>{item}</th>
              ))}
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="text" value={editCust.UID} name="UID" />
              </td>
              {custinput.map((item) => (
                <td>
                  <input
                    type="text"
                    onChange={changingValue}
                    value={editCust[item]}
                    name={item}
                  />
                </td>
              ))}
              <td>
                <input
                  type="text"
                  onChange={changingValue}
                  value={editCust.Status}
                  name="Status"
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <div className=" thepadding d-flex flex-row align-items-center justify-content-evenly">
        <button onClick={sendData}>確定</button>

        {theItem.ordpath && (
          <button>
            <Link to={"/order"}>取消 </Link>
          </button>
        )}
        {theItem.custpath && (
          <button>
            <Link to={"/"}>取消 </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Edit;
