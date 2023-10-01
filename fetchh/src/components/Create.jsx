import React, { useState, useContext, useMemo } from "react";
import { Thecontex } from "../App";
import { Link } from "react-router-dom";
import axiosFun from "../AxiosFun/axiosFun";
const Create = ({ path }) => {
  const Theinputs = useContext(Thecontex);

  const custinputNotmem = Theinputs.CustinputArr;
  const ordinputNotmem = Theinputs.OrderinputArr;
  const custinput = useMemo(() => {
    return custinputNotmem.slice(1);
  }, []);
  const ordinput = useMemo(() => {
    return ordinputNotmem.slice(1);
  }, []);
  console.log(custinput);
  const [custcreate, setcustcreate] = useState({});
  const [ordcreate, setordcreate] = useState({});

  const changing = (e) => {
    const { name, value } = e.target;
    setcustcreate({ ...custcreate, [name]: value });
  };
  const ordchanging = (e) => {
    const { name, value } = e.target;
    setordcreate({ ...ordcreate, [name]: value });
  };

  const Submitt = () => {
    let search = { custcreate: custcreate, ordcreate: ordcreate };
    axiosFun
      .post("http://localhost:3503/submit", search)
      .then((item) => {
        alert("success");
        setcustcreate({});
        setordcreate({});
      })
      .catch((e) => {
        console.log(e);
        alert("新增失敗");
      });
  };
  const SubmittCust = () => {
    axiosFun
      .post("http://localhost:3503/submitCust", custcreate)
      .then((item) => {
        alert("success");
        setcustcreate({});
      })
      .catch((e) => {
        console.log(e);
        alert("新增失敗");
      });
  };
  const SubmitOrd = () => {
    axiosFun
      .post("http://localhost:3503/submitOrd", ordcreate)
      .then((item) => {
        alert("success");
        setordcreate({});
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="creating">
      <header className="d-flex flex-row ">
        <div className=" inputsss d-flex flex-row align-items-center">
          <h5>新增客戶資料</h5>
          {custinput.map((item) => (
            <div>
              <label htmlFor="">{item}</label>
              <input
                type="text"
                name={item}
                placeholder={item}
                onChange={changing}
                value={custcreate[item] || ""}
              />
            </div>
          ))}
          <div>
            <label htmlFor="">Satus</label>
            <input
              type="text"
              name="Status"
              placeholder="Status"
              onChange={changing}
              value={custcreate.Status || ""}
            />
          </div>
          <button className="button" onClick={SubmittCust}>
            只新增客戶資料
          </button>
        </div>
      </header>

      <header className="d-flex flex-row ">
        <div className=" inputsss d-flex flex-row align-items-center">
          <h5>新增訂單資料</h5>
          {ordinput.map((item) => (
            <div>
              <label htmlFor="">{item}</label>
              <input
                type="text"
                name={item}
                placeholder={item}
                onChange={ordchanging}
                value={ordcreate[item] || ""}
              />
            </div>
          ))}
          <div>
            <label htmlFor="">Order_Date</label>
            <input
              type="date"
              name="Order_Date"
              id=""
              onChange={ordchanging}
              value={ordinput.Order_date || ""}
            />
          </div>
          <button className="button" onClick={SubmitOrd}>
            只新增客戶購買資料
          </button>
        </div>
      </header>
      <div className="divv d-flex flex-row align-items-center justify-content-center">
        <button className="button2" onClick={Submitt}>
          同時新增
        </button>

        {Theinputs.custpath && (
          <button>
            <Link to={"/"}>回上頁</Link>
          </button>
        )}

        {Theinputs.ordpath && (
          <button>
            <Link to={"/order"}>取消</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Create;
