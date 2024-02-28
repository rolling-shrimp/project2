import { useCallback, useEffect, useState } from "react";
import axiosFun from "../AxiosFun/axiosFun";

const useFetchData = (id, env) => {
  let basicUrl = env;
  const [custRender, setCustRender] = useState([]);
  const [orderRender, setOrderRender] = useState([]);
  const [searchCust, setSearchCust] = useState([]);
  const [searchOrd, setSearchOrd] = useState([]);
  const [resource, setResource] = useState(null);

  const promiseWrapper = (promise) => {
    let status = "pending";
    let result;
    let pending = promise
      .then((data) => {
        status = "success";
        result = data;
        console.log(data);
      })
      .catch((e) => {
        status = "error";
        result = e;
      });

    return () => {
      switch (status) {
        case "pending":
          throw pending;
        case "success":
          return result;
        case "error":
          throw result;
        default:
          throw new Error("Unknown status");
      }
    };
  };
  const fetchData = useCallback(() => {
    const fetch = async () => {
      if (id) {
        let founded = axiosFun.getOnly(`${basicUrl}/SearchSingleCust/${id}`);
        let consequence = founded.then((data) => data.data);
        console.log(consequence);
        setResource(promiseWrapper(consequence));
      } else {
        let customerData = axiosFun.getOnly(`${basicUrl}/CustDataAll`);
        let orderData = axiosFun.getOnly(`${basicUrl}/OrdDataAll`);
        let [customers, orders] = await Promise.all([customerData, orderData]);
        let newOrders = orders.data.map((item) => {
          let date = item.OrderDate;
          let yearMonthDay = date.split("T")[0];
          item.OrderDate = yearMonthDay;
          return item;
        });
        setCustRender(customers.data);
        setSearchCust(customers.data);
        setOrderRender(newOrders);
        setSearchOrd(newOrders);
      }
    };
    fetch();
  }, [basicUrl, id]);

  useEffect(() => {
    let fetch = true;
    if (fetch) {
      fetchData();
    }
    return () => {
      fetch = false;
    };
  }, [fetchData]);

  if (id) {
    return resource;
  } else {
    return [
      custRender,
      searchCust,
      orderRender,
      searchOrd,
      setCustRender,
      setOrderRender,
      setSearchCust,
      setSearchOrd,
    ];
  }
};

export default useFetchData;
