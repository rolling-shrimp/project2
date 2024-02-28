import { Routes, Route } from "react-router-dom";
import { useState, createContext, Suspense } from "react";

import Interface from "./pages/Interface";
import CheckData from "./components/CheckData";

import "./assets/common/comonItem.css";
import "bootstrap/dist/css/bootstrap.min.css";
export const Thecontex = createContext();
const Loading = () => {
  return (
    <div style={{ height: "500px", width: "500px" }}>
      <h1 style={{ color: "white" }}>..............</h1>
    </div>
  );
};
function App() {
  const CustinputArr = [
    "CustID",
    "Name",
    "Country",
    "State",
    "Zip",
    "City",
    "Address",
    "Status",
  ];

  const OrderinputArr = [
    "OrderID",
    "CustID",
    "TotalAmount",
    "OrdStatus",
    "SalesName",
  ];
  const [check, setCheck] = useState(null);
  const [query, setQuery] = useState({});
  const checkDataDetail = (id) => {
    setCheck(id);
  };
  return (
    <div className="App appClass d-flex flex-column align-items-center justify-content-between">
      <Thecontex.Provider
        value={{
          CustinputArr,
          OrderinputArr,
          checkDataDetail,
          check,
          query,
          setQuery,
          Loading,
        }}
      >
        <Routes>
          <Route path="/" element={<Interface />}></Route>
        </Routes>
        {check && (
          <Suspense fallback={<Loading />}>
            <CheckData
              checkDataDetail={checkDataDetail}
              CustinputArr={CustinputArr}
              key={check}
              theId={check}
            />
          </Suspense>
        )}
      </Thecontex.Provider>
    </div>
  );
}

export default App;
