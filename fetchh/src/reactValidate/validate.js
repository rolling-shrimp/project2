import * as Yup from "yup";
export const createCustomer = Yup.object().shape({
  CustID: Yup.string()
    .min(7, "必須至少七個字")
    .max(10, "必須小於等於10個字")
    .matches(/^[A-Za-z0-9]+$/, "只能包含字母和数字")
    .required("此字段是必填的"),
  Name: Yup.string()
    .max(20, "必須少於等於20個字")
    .min(2, "必須至少2個字")
    .required("此字段是必填的")
    .matches(/^[A-Za-z\u4E00-\u9FFF ]*$/, "只能輸入文字"),

  Country: Yup.string()
    .max(20, "必須少於等於20個字")
    .min(2, "必須至少2個字")
    .required("此字段是必填的")
    .matches(/^[A-Za-z\u4E00-\u9FFF ]*$/, "只能輸入文字"),

  State: Yup.string()
    .max(20, "必須少於等於20個字")
    .min(2, "必須至少2個字")
    .matches(/^[A-Za-z\u4E00-\u9FFF ]*$/, "只能輸入文字"),
  Zip: Yup.string()
    .length(3)
    .matches(/^\d*$/, "只能輸入數字")
    .required("不能為空"),
  City: Yup.string()
    .max(20, "必須少於等於20個字")
    .min(2, "必須至少2個字")
    .required("不能為空")
    .matches(/^[A-Za-z\u4E00-\u9FFF ]*$/, "只能輸入文字"),

  Address: Yup.string()
    .max(100, "必須少於等於20個字")
    .min(5, "必須多於等於5個字")
    .required("不能為空"),
  Status: Yup.string()
    .length(1, "只能輸入一個數字")
    .matches(/^[1-3]$/, "只能是1或2或3")
    .required("不能為空"),
});
export const createOrder = Yup.object().shape({
  OrderID: Yup.string()
    .min(6, "必須至少六個字")
    .max(10, "必須小於等於10個字")
    .matches(/^[A-Za-z0-9]+$/, "只能包含字母和数字")
    .required("此字段是必填的"),
  CustID: Yup.string()
    .min(7, "必須至少七個字")
    .max(10, "必須小於等於10個字")
    .matches(/^[A-Za-z0-9]+$/, "只能包含字母和数字")
    .required("不能為空"),
  TotalAmount: Yup.number()

    .required("不能為空")
    .min(10)
    .max(100000000),
  OrdStatus: Yup.string()
    .length(1, "只能輸入一個數字")
    .matches(/^[1-3]$/, "只能是1或2或3")
    .required("不能為空"),
  SalesName: Yup.string()
    .max(20, "必須少於等於20個字")
    .min(2, "必須至少2個字")
    .matches(/^[A-Za-z\u4E00-\u9FFF ]*$/, "只能輸入文字")
    .required("不能為空"),

  OrderDate: Yup.date().required("不能為空"),
});
export const editCustomer = Yup.object().shape({
  CustID: Yup.string()
    .min(7, "必須至少七個字")
    .max(10, "必須小於等於10個字")
    .matches(/^[A-Za-z0-9]+$/, "只能包含字母和数字"),
  Name: Yup.string()
    .max(20, "必須少於等於20個字")
    .min(2, "必須至少2個字")

    .matches(/^[A-Za-z\u4E00-\u9FFF ]*$/, "只能輸入文字"),

  Country: Yup.string()
    .max(20, "必須少於等於20個字")
    .min(2, "必須至少2個字")

    .matches(/^[A-Za-z\u4E00-\u9FFF ]*$/, "只能輸入文字"),

  State: Yup.string()
    .max(20, "必須少於等於20個字")
    .min(2, "必須至少2個字")
    .matches(/^[A-Za-z\u4E00-\u9FFF ]*$/, "只能輸入文字"),
  Zip: Yup.string().length(3).matches(/^\d*$/, "只能輸入數字"),
  City: Yup.string()
    .max(20, "必須少於等於20個字")
    .min(2, "必須至少2個字")

    .matches(/^[A-Za-z\u4E00-\u9FFF ]*$/, "只能輸入文字"),

  Address: Yup.string()
    .max(100, "必須少於等於20個字")
    .min(5, "必須多於等於5個字"),
  Status: Yup.string()
    .length(1, "只能輸入一個數字")
    .matches(/^[1-3]$/, "只能是1或2或3"),
});
export const editOrder = Yup.object().shape({
  OrderID: Yup.string()
    .min(6, "必須至少六個字")
    .max(10, "必須小於等於10個字")
    .matches(/^[A-Za-z0-9]+$/, "只能包含字母和数字"),
  CustID: Yup.string()
    .min(7, "必須至少七個字")
    .max(10, "必須小於等於10個字")
    .matches(/^[A-Za-z0-9]+$/, "只能包含字母和数字"),
  TotalAmount: Yup.number()

    .min(10, "必須大於等於10")
    .max(100000000, "必須小於等於100000000"),
  OrdStatus: Yup.string()
    .length(1, "只能輸入一個數字")
    .matches(/^[1-3]$/, "只能是1或2或3"),
  SalesName: Yup.string()
    .max(20, "必須少於等於20個字")
    .min(2, "必須至少2個字")
    .matches(/^[A-Za-z\u4E00-\u9FFF ]*$/, "只能輸入文字"),
  OrderDate: Yup.date(),
});
