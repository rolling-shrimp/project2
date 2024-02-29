import { useCallback, useEffect, useState } from "react";
import axiosFun from "../AxiosFun/axiosFun";
import { redo } from "../eventHandler/eventHandling";
const useFetchData = (isOrder, id, env) => {
  let basicUrl = env;

  const [toRender, setToRender] = useState(null);
  const [compareWhithQuery, setCompareWhithQuery] = useState([]);

  const [resource, setResource] = useState(null);

  let getDataWhenSwitchIn = useCallback(() => {
    if (id) {
      axiosFun
        .get(`${basicUrl}/SearchSingleCust/${id}`)
        .then((response) => setResource(response.data))
        .catch((e) => {
          alert("error happened");
          console.log(e);
        });
    } else {
      redo(axiosFun, isOrder, basicUrl, setToRender, setCompareWhithQuery);
    }
  }, [isOrder, basicUrl, id]);

  useEffect(() => {
    getDataWhenSwitchIn();
  }, [getDataWhenSwitchIn, isOrder]);

  if (id) {
    return resource;
  } else {
    return [toRender, compareWhithQuery, setToRender, setCompareWhithQuery];
  }
};

export default useFetchData;
