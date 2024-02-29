import { useState, createContext } from "react";

import Interface from "./pages/Interface";
import CheckData from "./components/CheckData";

import "./assets/common/comonItem.css";
import "bootstrap/dist/css/bootstrap.min.css";
export const Thecontex = createContext();
const Loading = () => {
  return (
    <div style={{ height: "500px", width: "500px" }}>
      <h4 style={{ color: "white" }}>......Loading.........</h4>
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
  const [isOrder, setIsOrder] = useState(false);
  const changePage = () => {
    setIsOrder(!isOrder);
    setQuery({});
  };
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
        {isOrder ? (
          <Interface
            key="orderInterface"
            isOrder={isOrder}
            changePage={changePage}
          />
        ) : (
          <Interface
            key="customerInterface"
            isOrder={isOrder}
            changePage={changePage}
          />
        )}

        {check && (
          <CheckData
            checkDataDetail={checkDataDetail}
            CustinputArr={CustinputArr}
            key={check}
            theId={check}
            Loading={Loading}
            isOrder={isOrder}
          />
        )}
      </Thecontex.Provider>
    </div>
  );
}

export default App;
