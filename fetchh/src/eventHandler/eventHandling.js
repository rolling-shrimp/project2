import Swal from "sweetalert2";
//the search function
export const submitSearch = (
  compareWithQuery,
  query,
  setCompareWhithQuery,
  setQuery,
  setRedoDisable
) => {
  if (query === "") {
    Swal.fire({ title: "請確實輸入搜尋條件", confirmButtonColor: "#050d53 " });
    return;
  }

  let toCompare = isNaN(parseInt(query)) ? query : parseInt(query);

  let searChedArray = compareWithQuery.filter((item) => {
    for (let property in item) {
      if (item[property] === toCompare) {
        return true;
      }
    }

    return false;
  });

  if (searChedArray.length === 0) {
    Swal.fire({ title: "查無資料", confirmButtonColor: "#050d53 " });
  } else {
    setRedoDisable(false);
    setCompareWhithQuery(searChedArray);
    setQuery("");
  }
};

//the insert data to database function
export const createNewData = (
  isOrder,
  query,
  basicUrl,
  redo,
  axiosFun,
  setToRender,
  setCompareWhithQuery,
  reset
) => {
  Swal.fire({
    title: "確定要新增嗎",
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    confirmButtonColor: "#050d53 ",
  }).then((result) => {
    if (result.isConfirmed) {
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

      axiosFun
        .post(`${basicUrl}/submit`, dataToCreate)
        .then(() => {
          Swal.fire({
            title: "新增成功",
            confirmButtonColor: "#050d53 ",
            icon: "success",
          });
          reset();
          redo(axiosFun, basicUrl, isOrder, setToRender, setCompareWhithQuery);
        })
        .catch((e) => {
          console.log(e);
          Swal.fire({
            title: "新增失敗",
            text: `${e.response.data}`,
            confirmButtonColor: "#050d53 ",
            icon: "error",
          });
        });
    }
  });
};

//the update data in database function
export const editData = async (
  id,
  sthToUpdate,
  isOrder,
  axiosFun,
  basicUrl,
  redo,
  setToRender,
  setCompareWhithQuery,
  reset
) => {
  if (Object.keys(sthToUpdate).length === 0) {
    Swal.fire({ title: "請至少填寫一個欄位", confirmButtonColor: "#050d53 " });

    return;
  }

  Swal.fire({
    title: "確定要修改嗎",
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: "取消",
    confirmButtonColor: "#050d53 ",
  }).then((result) => {
    if (result.isConfirmed) {
      let searchQuery = Object.entries(sthToUpdate).filter(
        ([key, value]) => value !== ""
      );
      let toUpdate = Object.fromEntries(searchQuery);
      // if (Object.keys(toUpdate).length === 0) {
      //   Swal.fire("請至少填寫一個欄位");
      //   return;
      // }
      isOrder
        ? axiosFun
            .put(`${basicUrl}/OrdEdit/${id}`, toUpdate)
            .then(() => {
              Swal.fire({
                title: "修改成功",
                icon: "success",
                confirmButtonColor: "#050d53 ",
              });
              reset();
              redo(
                axiosFun,
                basicUrl,
                isOrder,
                setToRender,
                setCompareWhithQuery
              );
            })
            .catch((e) => {
              Swal.fire({
                title: "修改失敗",
                icon: "error",
                confirmButtonColor: "#050d53 ",
              });
            })
        : axiosFun
            .put(`${basicUrl}/CustEdit/${id}`, toUpdate)
            .then(() => {
              Swal.fire({
                title: "修改成功",
                icon: "success",
                confirmButtonColor: "#050d53 ",
              });
              reset();
              redo(
                axiosFun,
                basicUrl,
                isOrder,
                setToRender,
                setCompareWhithQuery
              );
            })
            .catch((e) => {
              Swal.fire({
                title: "修改失敗",
                icon: "error",
                confirmButtonColor: "#050d53 ",
              });
            });
    }
  });
};

//the delete data in database function
export const deleteInf = (
  data,
  url,
  obj,
  axiosFun,
  redo,
  setToRender,
  setCompareWhithQuery,
  basicUrl,
  isOrder
) => {
  if (data.length === 3) {
    Swal.fire({
      title: "不能再刪除了",
      confirmButtonColor: "#050d53 ",
      icon: "error",
    });
    return;
  }
  Swal.fire({
    title: "確定要刪除嗎?",
    text: "按下刪除該資料將永遠消失",
    showCancelButton: true,
    confirmButtonColor: "#050d53 ",
    confirmButtonText: "確定",
    cancelButtonText: "取消",
  }).then((result) => {
    if (result.isConfirmed) {
      axiosFun
        .delete(url, obj)
        .then(() => {
          Swal.fire({
            title: "刪除成功",
            icon: "success",
            confirmButtonColor: "#050d53 ",
          });
          redo(axiosFun, basicUrl, isOrder, setToRender, setCompareWhithQuery);
        })
        .catch(() => {
          Swal.fire({
            title: "刪除失敗",
            confirmButtonColor: "#050d53 ",
            icon: "error",
          });
        });
    }
  });
};

//the Initial or redo eventHandler
export const redo = async (
  axiosFun,
  isOrder,
  basicUrl,
  setToRender,
  setCompareWhithQuery
) => {
  let url;
  isOrder
    ? (url = `${basicUrl}/OrdDataAll`)
    : (url = `${basicUrl}/CustDataAll`);
  try {
    let response = await axiosFun.getOnly(url);

    setToRender(response.data);
    setCompareWhithQuery(response.data);
  } catch (e) {
    console.log(e);
  }
};
export const redoAfterCreatEddit = async (
  axiosFun,
  basicUrl,
  isOrder,
  setToRender,
  setCompareWhithQuery
) => {
  let url;
  isOrder
    ? (url = `${basicUrl}/OrdDataAll`)
    : (url = `${basicUrl}/CustDataAll`);
  try {
    let response = await axiosFun.getOnly(url);

    setToRender(response.data);
    setCompareWhithQuery(response.data);
  } catch (e) {
    console.log(e);
  }
};
