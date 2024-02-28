import JOi from "joi";
export const customerInputVal = (data) => {
  const schema = JOi.object({
    CustID: JOi.string().min(7).max(10).alphanum().required().messages({
      "string.alphanum": "CustID只能包含字母和數字",
      "string.empty": "CustID不能為空",
      "any.required": "CustID不能為空",
    }),
    Name: JOi.string()
      .max(20)
      .min(2)
      .required()
      .pattern(new RegExp("^[\\p{L} ]*$", "u"))
      .messages({
        "string.empty": "Name不能為空",
        "any.required": "Name不能為空",
        "string.pattern.base": "Name只能輸入文字，不能有符號或數字。",
      }),
    Country: JOi.string()
      .max(20)
      .min(2)
      .required()
      .pattern(new RegExp("^[\\p{L} ]*$", "u"))
      .messages({
        "string.empty": "Country不能為空",
        "any.required": "Country不能為空",
        "string.pattern.base": "Country只能輸入文字，不能有符號或數字。",
      }),
    State: JOi.string()
      .max(20)
      .min(2)
      .allow("")
      .pattern(new RegExp("^[\\p{L} ]*$", "u"))
      .messages({
        "string.pattern.base": "State只能輸入文字，不能有符號或數字。",
      }),
    Zip: JOi.string()
      .length(3)
      .pattern(new RegExp("^[0-9]+$"))
      .required()
      .messages({
        "string.pattern.base": "Zip只能輸入數字。",
        "string.empty": "Zip不能為空",
        "any.required": "Zip不能為空",
      }),
    City: JOi.string()
      .max(20)
      .min(2)
      .required()
      .pattern(new RegExp("^[\\p{L} ]*$", "u"))
      .messages({
        "string.empty": "City不能為空",
        "any.required": "City不能為空",
        "string.pattern.base": "City只能輸入文字，不能有符號或數字。",
      }),
    Address: JOi.string()
      .max(100)
      .min(5)
      .required()

      .messages({
        "string.empty": "Address不能為空",
        "any.required": "Address不能為空",
      }),
    Status: JOi.string().length(1).valid("1", "2", "3").required().messages({
      "string.empty": "Status不能為空",
      "any.required": "Status不能為空",
      "any.only": "Status必須輸入，只能是1或2或3",
    }),
  });
  return schema.validate(data);
};

export const OrderValidate = (data) => {
  const schema = JOi.object({
    OrderID: JOi.string().min(6).max(10).alphanum().required().messages({
      "string.alphanum": "OrderID只能包含字母和數字",
      "string.empty": "OrderID不能為空",
      "any.required": "OrderID不能為空",
    }),
    CustID: JOi.string().min(7).max(10).alphanum().required().messages({
      "string.alphanum": "CustID只能包含字母和數字",
      "string.empty": "CustID不能為空",
      "any.required": "CustID不能為空",
    }),
    TotalAmount: JOi.number()

      .required()
      .min(10)
      .max(100000000)
      .messages({
        "number.empty": "TotalAmount不能為空",
        "any.required": "TotalAmount不能為空",
      }),
    OrdStatus: JOi.string().length(1).valid("1", "2", "3").required().messages({
      "any.required": "OrdStatus必須輸入，只能是1或2或3",
      "any.only": "OrdStatus只能是1或2或3",
    }),
    SalesName: JOi.string()
      .max(20)
      .min(2)
      .pattern(new RegExp("^[\\p{L} ]*$", "u"))
      .required()
      .messages({
        "string.empty": "Salesman不能為空",
        "any.required": "Salesman不能為空",
        "string.pattern.base": "SalesName只能輸入文字，不能有符號或數字。",
      }),
    OrderDate: JOi.date().required().messages({
      "date.empty": "OrderDate不能為空",
      "any.required": "OrderDate不能為空",
    }),
  });
  return schema.validate(data);
};
export const EditCustValidate = (data) => {
  const schema = JOi.object({
    CustID: JOi.string().min(7).max(10).alphanum().messages({
      "string.alphanum": "CustID只能包含字母和數字",
    }),
    Name: JOi.string()
      .pattern(new RegExp("^[\\p{L} ]*$", "u"))
      .max(20)
      .min(2)
      .messages({
        "string.pattern.base": "Name只能輸入文字，不能有符號或數字。",
      }),
    Country: JOi.string()

      .max(20)
      .min(2)
      .pattern(new RegExp("^[\\p{L} ]*$", "u"))
      .messages({
        "string.pattern.base": "Country只能輸入文字，不能有符號或數字。",
      }),
    State: JOi.string()
      .max(10)
      .min(2)
      .pattern(new RegExp("^[\\p{L} ]*$", "u"))
      .allow("")
      .messages({
        "string.pattern.base": "State只能輸入文字，不能有符號或數字。",
      }),
    Zip: JOi.string().pattern(new RegExp("^[0-9]+$")).length(3).messages({
      "string.pattern.base": "Zip只能輸入數字。",
    }),
    City: JOi.string()
      .max(20)
      .min(2)
      .pattern(new RegExp("^[\\p{L} ]*$", "u"))
      .messages({
        "string.pattern.base": "City只能輸入文字，不能有符號或數字。",
      }),
    Address: JOi.string()
      .max(100)
      .min(5)

      .max(100)
      .min(5)
      .messages({
        "string.pattern.base": "該欄位必須包含文字和數字，數字不能單獨出現",
      }),
    Status: JOi.string().length(1).valid("1", "2", "3").messages({
      "any.only": "Status只能是1或2或3",
    }),
  });
  return schema.validate(data);
};
export const EditOrdValidate = (data) => {
  const schema = JOi.object({
    OrderID: JOi.string().min(6).max(10).alphanum().messages({
      "string.alphanum": "OrderID只能包含字母和數字",
    }),
    CustID: JOi.string().min(7).max(10).alphanum().messages({
      "string.alphanum": "CustID只能包含字母和數字",
    }),
    TotalAmount: JOi.number().max(10000000).min(10),
    OrdStatus: JOi.string().length(1).valid("1", "2", "3").messages({
      "any.only": "OrdStatus只能是1或2或3",
    }),
    SalesName: JOi.string()
      .pattern(new RegExp("^[\\p{L} ]*$", "u"))
      .max(20)
      .min(2)
      .messages({
        "string.pattern.base": "SalesName只能輸入文字，不能有符號或數字。",
      }),
    OrderDate: JOi.date(),
  });
  return schema.validate(data);
};
