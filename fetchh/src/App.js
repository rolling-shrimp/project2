import { Routes, Route } from "react-router-dom";
import { useState, useContext, createContext } from "react";

import Interface from "./pages/Interface";
import Create from "./components/Create";
import Edit from "./pages/Edit";
import EditOrd from "./pages/EditOrd";
import "./assets/common/comonItem.css";
import "bootstrap/dist/css/bootstrap.min.css";
export const Thecontex = createContext();
function App() {
  let custpath = "/";
  let ordpath = "/order";
  const CustinputArr = [
    "UID",
    "CustID",
    "Name",
    "Country",
    "State",
    "Zip",
    "City",
    "Address",
  ];
  // SELECT * FROM customer INNER JOIN orders ON customer.ID = orders.Customer_ID WHERE City LIKE '%New York%' AND State LIKE '%NY%'

  const OrderinputArr = [
    "OrderID",
    "Customer_ID",
    "TotalAmount",
    "OrdStatus",
    "SalesName",
  ];

  return (
    <div className="App">
      <Thecontex.Provider value={{ CustinputArr, OrderinputArr, custpath }}>
        <Routes>
          <Route path="/" element={<Interface />}></Route>
          <Route path="/custCreate" element={<Create />}></Route>
          <Route path="/custEdit/:id" element={<Edit />}></Route>
        </Routes>
      </Thecontex.Provider>
      <Thecontex.Provider value={{ CustinputArr, OrderinputArr, ordpath }}>
        <Routes>
          <Route path="/order" element={<Interface />}></Route>
          <Route path="/ordCreate" element={<Create />}></Route>
          <Route path="/ordEdit/:id" element={<EditOrd />}></Route>
        </Routes>
      </Thecontex.Provider>
    </div>
  );
}

export default App;
