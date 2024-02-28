import React, { useState, createContext, useContext } from "react";
import Search from "../components/Search";
import Show from "../components/Show";
import useFetchData from "../components/useFetchData";
import axiosFun from "../AxiosFun/axiosFun";
import "../assets/interface/interface.css";
import { Thecontex } from "../App";

export const ProvideData = createContext();
const Interface = () => {
  const [
    custRender,
    searchCust,
    orderRender,
    searchOrd,
    setCustRender,
    setOrderRender,
    setSearchCust,
    setSearchOrd,
  ] = useFetchData(null, "https://crud-project-yh8x.onrender.com");

  const [isOrder, setIsOrder] = useState(false);
  const [basicUrl, setBasicUrl] = useState(
    "https://crud-project-yh8x.onrender.com"
  );
  const [eachPageAmount, setEachPageAmount] = useState(5);
  const { Loading, setQuery } = useContext(Thecontex);

  //the changing page eventhandler
  const changePage = () => {
    setIsOrder(!isOrder);
    setQuery({});
  };

  const redo = async () => {
    let url;
    isOrder
      ? (url = `${basicUrl}/OrdDataAll`)
      : (url = `${basicUrl}/CustDataAll`);
    try {
      let response = await axiosFun.getOnly(url);

      if (isOrder) {
        setOrderRender(response.data);
        setSearchOrd(response.data);
      } else {
        setCustRender(response.data);
        setSearchCust(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!custRender.length) {
    return <Loading />;
  } else {
    return (
      <div className="interface">
        {isOrder ? (
          <Search
            eachPageAmount={eachPageAmount}
            isOrder={isOrder}
            data={searchOrd}
            setdata={setOrderRender}
            redo={redo}
            basicUrl={basicUrl}
            setComparingArray={setSearchOrd}
            changePage={changePage}
          />
        ) : (
          <Search
            eachPageAmount={eachPageAmount}
            isOrder={isOrder}
            data={searchCust}
            setdata={setCustRender}
            redo={redo}
            basicUrl={basicUrl}
            setComparingArray={setSearchCust}
            changePage={changePage}
          />
        )}

        {isOrder ? (
          <ProvideData.Provider
            value={{
              basicUrl,
              redo,
              isOrder,
              data: orderRender,
            }}
          >
            <Show
              key="order"
              eachPageAmount={eachPageAmount}
              data={orderRender}
              isOrder={isOrder}
            />
          </ProvideData.Provider>
        ) : (
          <ProvideData.Provider
            value={{ data: custRender, basicUrl, redo, isOrder }}
          >
            <Show
              key="customer"
              eachPageAmount={eachPageAmount}
              data={custRender}
              isOrder={isOrder}
            />
          </ProvideData.Provider>
        )}
      </div>
    );
  }
};

export default Interface;
