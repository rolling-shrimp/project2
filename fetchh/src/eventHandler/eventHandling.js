//the search function
export const submitSearch = (data, query, setdata, setQuery) => {
  let searchQuery = Object.entries(query).filter(
    ([key, value]) => value !== ""
  );

  let searChedArray = data.filter((item) => {
    for (const [key, value] of searchQuery) {
      if (value !== item[key]) {
        return false;
      }
    }
    return true;
  });

  if (searChedArray.length === 0) {
    alert("查無資料");
  } else {
    setdata(searChedArray);
  }
  setQuery({});
};

//the insert data to database function
export const createNewData = async (
  isOrder,
  query,
  basicUrl,
  redo,
  setQuery,
  axiosFun
) => {
  if (window.confirm("確定要新增嗎")) {
    let dataToCreate;
    let type;

    isOrder ? (type = "order") : (type = "customer");
    switch (type) {
      case "customer":
        dataToCreate = { ...query, type };
        break;
      case "order":
        dataToCreate = { ...query, type };
        break;
      default:
        return;
    }
    try {
      await axiosFun.post(`${basicUrl}/submit`, dataToCreate);
      alert("新增成功");
      redo();
      setQuery({});
    } catch (e) {
      alert(`新增失敗，錯誤訊息: ${e.response.data} `);
    }
  }
};

//the update data in database function
export const editData = async (
  id,
  sthToUpdate,
  isOrder,
  axiosFun,
  basicUrl,
  redo,
  setQuery
) => {
  if (window.confirm("確定要修改嗎?")) {
    if (Object.keys(sthToUpdate).length === 0) {
      alert("請至少填寫一個欄位");
      return;
    }

    try {
      let searchQuery = Object.entries(sthToUpdate).filter(
        ([key, value]) => value !== ""
      );
      let toUpdate = Object.fromEntries(searchQuery);
      if (Object.keys(toUpdate).length === 0) {
        alert("請至少填寫一個欄位");
        return;
      }

      isOrder
        ? await axiosFun.put(`${basicUrl}/OrdEdit/${id}`, toUpdate)
        : await axiosFun.put(`${basicUrl}/CustEdit/${id}`, toUpdate);

      alert("修改成功");
      setQuery({});
      redo();
    } catch (e) {
      alert(`修改失敗，錯誤訊息: ${e.response.data} `);
    }
  }
};

//the delete data in database function
export const deleteInf = async (data, url, obj, axiosFun, redo) => {
  data.length === 3 && alert("不能再刪除了");
  if (window.confirm("確定要刪除嗎?")) {
    try {
      await axiosFun.delete(url, obj);
      alert("刪除成功");
      redo();
    } catch (e) {
      alert("刪除失敗");
    }
  }
};
