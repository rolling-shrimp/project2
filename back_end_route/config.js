const express = require("express");

const connection = require("./mysqlDB");
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // 导入dotenv模块，加载环境变量
const app = express();
app.use(cors());
app.use(express.json());

app.get("/CustDataAll", (req, res) => {
  const query = `
  SELECT customer.*, SUM(CASE WHEN orders.Order_Date IS NULL OR orders.Order_Date >= DATE_SUB(CURDATE(), INTERVAL 3 YEAR) THEN orders.TotalAmount ELSE NULL END) AS ThreeYearTotalAmount 
  FROM customer LEFT JOIN orders ON customer.ID = orders.Customer_ID GROUP BY customer.ID;

  
 
  `;

  // 执行查询
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.sendStatus(500); // 发送错误响应
    } else {
      res.json(results); // 将查询结果作为 JSON 响应发送
    }
  });
});
app.get("/custEdit/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT *
    FROM customer Where ID = ?
 
  `;

  // 执行查询
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.sendStatus(500); // 发送错误响应
    } else {
      res.json(results); // 将查询结果作为 JSON 响应发送
    }
  });
});
app.get("/ordEdit/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT *
    FROM orders Where ID = ?
 
  `;

  // 执行查询
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.sendStatus(500); // 发送错误响应
    } else {
      res.json(results); // 将查询结果作为 JSON 响应发送
    }
  });
});

app.get("/OrdDataAll", (req, res) => {
  const query = `
    SELECT *
    FROM orders
 
  `;

  // 执行查询
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.sendStatus(500); // 发送错误响应
    } else {
      res.json(results); // 将查询结果作为 JSON 响应发送
    }
  });
});
app.get("/SearchData", (req, res) => {
  const queryParams = []; // 用于存储查询参数
  let queryConditions = "customer.Status = 1"; // 默认查询条件

  // 遍历 req.query 的属性
  for (const key in req.query) {
    if (req.query.hasOwnProperty(key)) {
      const value = req.query[key];

      // 根据属性名和属性值构建查询条件
      if (value) {
        queryConditions += ` AND ${key} = ?`;
        queryParams.push(value);
      }
    }
  }
  console.log(queryConditions);
  console.log(queryParams);
  if (queryParams.length === 0) {
    console.error("No valid query parameters provided.");
    return res.sendStatus(400); // Bad Request
  }

  // 构建完整的 SQL 查询语句
  const query = `
 
    SELECT customer.*, SUM(CASE WHEN orders.Order_Date IS NULL OR orders.Order_Date >= DATE_SUB(CURDATE(), INTERVAL 3 YEAR) THEN orders.TotalAmount ELSE 0 END) AS ThreeYearTotalAmount FROM customer LEFT JOIN orders ON customer.ID = orders.Customer_ID 
    WHERE customer.Status = 1 AND ${queryConditions}  GROUP BY customer.ID;

  `;

  // 执行查询
  connection.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.sendStatus(500); // 发送错误响应
    } else {
      console.log("查詢成功");
      res.json(results); // 将查询结果作为 JSON 响应发送
    }
  });
});
// app.get("/SearchData", (req, res) => {
//   const queryParams = []; // 用于存储查询参数
//   let queryConditions = "customer.Status = 1"; // 默认查询条件

//   // 遍历 req.query 的属性
//   for (const key in req.query) {
//     if (req.query.hasOwnProperty(key)) {
//       const value = req.query[key];

//       // 根据属性名和属性值构建查询条件
//       if (value) {
//         // 注意：这里假设所有属性都是要进行模糊查询的
//         queryConditions += ` AND ${key} LIKE ?`;
//         queryParams.push(`%${value}%`);
//       }
//     }
//   }
//   console.log(queryConditions);

//   // 构建完整的 SQL 查询语句
//   const query = `
//     SELECT customer.*, SUM(orders.TotalAmount) AS ThreeYearTotalAmount
//     FROM customer
//     LEFT JOIN orders ON customer.UID = orders.Customer_ID
//     WHERE
//       ${queryConditions}
//       AND (orders.Order_Date IS NULL OR orders.Order_Date >= DATE_ADD(CURDATE(), INTERVAL 3 YEAR))
//     GROUP BY customer.UID;

//   `;

//   // 执行查询
//   connection.query(query, queryParams, (error, results) => {
//     if (error) {
//       console.error("Error executing query:", error);
//       res.sendStatus(500); // 发送错误响应
//     } else {
//       console.log("查詢成功");
//       res.json(results); // 将查询结果作为 JSON 响应发送
//     }
//   });
// });

// app.get("/SearchData", (req, res) => {
//   const queryParams = []; // 用于存储查询参数
//   let queryConditions = "customer.Status = 1"; // 默认查询条件

//   // 遍历 req.query 的属性
//   for (const key in req.query) {
//     if (req.query.hasOwnProperty(key)) {
//       const value = req.query[key];

//       // 根据属性名和属性值构建查询条件
//       if (value) {
//         // 注意：这里假设所有属性都是要进行模糊查询的
//         queryConditions += ` AND ${key} LIKE ?`;
//         queryParams.push(`%${value}%`);
//       }
//     }
//   }
//   console.log(queryConditions);

//   // 构建完整的 SQL 查询语句
//   const query = `
//     SELECT customer.*, SUM(orders.TotalAmount) AS ThreeYearTotalAmount
//     FROM customer
//     WHERE
//       ${queryConditions}And (orders ON customer.UID = orders.Customer_ID
//       WHERE orders.Order_Date IS NULL OR orders.Order_Date >= DATE_ADD(CURDATE(), INTERVAL 3 YEAR))
//       GROUP BY customer.UID;

//   `;

//   // 执行查询
//   connection.query(query, queryParams, (error, results) => {
//     if (error) {
//       console.error("Error executing query:", error);
//       res.sendStatus(500); // 发送错误响应
//     } else {
//       res.json(results); // 将查询结果作为 JSON 响应发送
//     }
//   });
// });
// app.get("/SearchData", (req, res) => {
//   const queryParams = []; // 用于存储查询参数
//   let queryConditions = "Status = 1"; // 默认查询条件

//   // 遍历 req.query 的属性
//   for (const key in req.query) {
//     if (req.query.hasOwnProperty(key)) {
//       const value = req.query[key];

//       // 根据属性名和属性值构建查询条件
//       if (value) {
//         // 注意：这里假设所有属性都是要进行模糊查询的
//         queryConditions += ` AND ${key} LIKE ?`;
//         queryParams.push(`%${value}%`);
//       }
//     }
//   }

//   // 构建完整的 SQL 查询语句
//   const query = `
//     SELECT *
//     FROM customer
//     WHERE
//       ${queryConditions}

//   `;

//   // 执行查询
//   connection.query(query, queryParams, (error, results) => {
//     if (error) {
//       console.error("Error executing query:", error);
//       res.sendStatus(500); // 发送错误响应
//     } else {
//       res.json(results); // 将查询结果作为 JSON 响应发送
//     }
//   });
// });
app.get("/SearchOrdData", (req, res) => {
  const queryParams = []; // 用于存储查询参数
  let queryConditions = "Status = 1"; // 默认查询条件
  console.log(req.query);
  // 遍历 req.query 的属性
  for (const key in req.query) {
    if (req.query.hasOwnProperty(key)) {
      const value = req.query[key];

      // 根据属性名和属性值构建查询条件
      if (value) {
        // 注意：这里假设所有属性都是要进行模糊查询的
        queryConditions += ` AND ${key} LIKE ?`;
        queryParams.push(`%${value}%`);
      }
    }
  }

  // 构建完整的 SQL 查询语句
  const query = `
    SELECT *
    FROM orders
    WHERE
      ${queryConditions}
  `;
  console.log(query);
  // 执行查询
  connection.query(query, queryParams, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      console.log(error);
      res.sendStatus(500); // 发送错误响应
    } else {
      console.log("查詢成功");
      res.json(results); // 将查询结果作为 JSON 响应发送
    }
  });
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  let { custcreate, ordcreate } = req.body;
  const { CustID, Name, Country, State, Zip, City, Address, Status } =
    custcreate;
  let insertCustQuery = `insert into customer(ID,Name,Country,State,Zip,City,Address,Status) values (?, ?, ?, ?, ?, ?, ?, ?)`;
  console.log(custcreate);
  let custArr = [CustID, Name, Country, State, Zip, City, Address, Status];

  connection.query(insertCustQuery, custArr, function (err, rows) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log("新增客戶資料成功");
    }

    const { Customer_ID, TotalAmount, OrdStatus, SalesName, Order_Date } =
      ordcreate;
    const ordArr = [Customer_ID, TotalAmount, OrdStatus, SalesName, Order_Date];
    let insertOrdQuery =
      "insert into orders(Customer_ID,TotalAmount,Status,Sales_Name,Order_Date) values(?,?,?,?,?)";
    connection.query(insertOrdQuery, ordArr, (error, results) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        console.log("新增客戶訂單成功");
        res.json(results);
      }
    });
  });
});
app.post("/submitCust", (req, res) => {
  console.log(req.body);
  let custcreate = req.body;
  const { CustID, Name, Country, State, Zip, City, Address, Status } =
    custcreate;
  let insertCustQuery = `insert into customer(ID,Name,Country,State,Zip,City,Address,Status) values (?, ?, ?, ?, ?, ?, ?, ?)`;
  console.log(custcreate);
  let custArr = [CustID, Name, Country, State, Zip, City, Address, Status];
  console.log(custArr);

  connection.query(insertCustQuery, custArr, function (err, rows) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log("新增客戶資料成功");
      res.json(rows);
    }
  });
});
app.post("/submitOrd", (req, res) => {
  console.log(req.body);
  const { Customer_ID, TotalAmount, OrdStatus, SalesName, Order_Date } =
    req.body;

  let insertOrdQuery =
    "insert into orders(Customer_ID,TotalAmount,Status,Sales_Name,Order_Date) values(?,?,?,?,?)";
  connection.query(
    insertOrdQuery,
    [Customer_ID, TotalAmount, OrdStatus, SalesName, Order_Date],
    (error, results) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        console.log("新增客戶訂單成功");
        res.json(results);
      }
    }
  );
});

app.put("/CustEdit", function (req, res) {
  console.log(req.body);

  const { CustID, Name, Country, State, Zip, City, Address, Status, UID } =
    req.body;
  const arrrr = [CustID, Name, Country, State, Zip, City, Address, Status, UID];

  console.log(arrrr);
  connection.query(
    "update customer set ID = ?, Name = ?, Country = ?, State= ?, Zip = ?, City=?, Address = ?,Status=? where UId = ?",
    arrrr,
    function (err, rows) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log("修改成功");
        res.json(rows);
      }
    }
  );
});
app.put("/OrdEdit", function (req, res) {
  console.log(req.body);
  const { id } = req.params;
  const {
    OrderID,
    Customer_ID,
    TotalAmount,
    OrdStatus,
    SalesName,
    Order_Date,
  } = req.body;
  const arrrr = [
    Customer_ID,
    TotalAmount,
    OrdStatus,
    SalesName,
    Order_Date,
    OrderID,
  ];

  console.log(arrrr);
  connection.query(
    "update orders set Customer_ID = ?, TotalAmount = ?, Status = ?, Sales_Name= ?, Order_Date = ? where ID = ?",
    arrrr,
    function (err, rows) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log("修改成功");
        res.json(rows);
      }
    }
  );
});
app.delete("/CustDelete/:id", function (req, res) {
  console.log(req.params);
  connection.query(
    "delete from customer where UID = ?",
    [req.params.id],
    function (err, rows) {
      res.send("#" + req.params.id + " deleted");
    }
  );
});
app.delete("/OrdDelete/:id", function (req, res) {
  connection.query(
    "delete from orders where ID = ?",
    [req.params.id],
    function (err, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log("刪除成功");
        res.send("#" + req.params.id + " deleted");
      }
    }
  );
});

app.listen(3503, () => {
  console.log("port 3503 receiving request.");
});
