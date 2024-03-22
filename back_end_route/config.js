import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//import the mongodb models
import Customer from "./models/customer_model.js";
import Order from "./models/order_model.js";
import {
  customerInputVal,
  OrderValidate,
  EditCustValidate,
  EditOrdValidate,
} from "./validation/validation.js";

//connect database
mongoose
  .connect(process.env.DB_Connect, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to mongodb atlas.");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//the routes

//get all the customer and order datas from database when use first arrive the website
app.get("/CustDataAll", async (req, res) => {
  try {
    let customerData = await Customer.find({});

    // find totalamount among three years
    let currentDay = new Date();
    currentDay.setHours(23, 59, 59, 999);
    let threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(currentDay.getFullYear() - 3);
    threeYearsAgo.setHours(0, 0, 0, 0);
    let amounts = await Order.aggregate([
      {
        $match: {
          CustID: { $in: customerData.map((item) => item.CustID) },
          OrderDate: {
            $gte: threeYearsAgo,
            $lt: currentDay,
          },
        },
      },
      {
        $group: { _id: "$CustID", TotalAmount: { $sum: "$TotalAmount" } },
      },
    ]);
    // combine the order and customer datas together
    let theConsequenceData = customerData.map((theObj) => {
      let sameCustID = amounts.find((amount) => amount._id === theObj.CustID);
      if (sameCustID) {
        return {
          ...theObj.toObject(),
          threeYearAmount: sameCustID.TotalAmount,
        };
      } else {
        return theObj;
      }
    });

    res.json(theConsequenceData);
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});
app.get("/OrdDataAll", async (req, res) => {
  try {
    let orderData = await Order.find({});

    res.json(orderData);
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
});

// find the singles customer's data and their orders
app.get("/SearchSingleCust/:id", async (req, res) => {
  let { id } = req.params;

  try {
    //find the customer data which id matches
    let customerData = await Customer.findOne({ _id: id });
    let { CustID } = customerData;
    let orderData = await Order.find({ CustID });

    console.log(customerData);
    // combine the order and customer datas together
    let theConsequenceData = { customerData, orderData };
    console.log(theConsequenceData);
    res.json(theConsequenceData);
  } catch (e) {
    console.error(e);
  }
});

//insert new datas into the database
app.post("/submit", async (req, res) => {
  let { type } = req.body;
  try {
    //if the type is customer, insert customer's data if not insert order data
    if (type == "customer") {
      delete req.body.type;
      const { error } = customerInputVal(req.body);
      if (error) {
        console.error(error.message);
        return res.status(400).send(error.message);
      }
      const { CustID, Name, Country, State, Zip, City, Address, Status } =
        req.body;

      let sameID = await Customer.findOne({ CustID: CustID });

      if (sameID) {
        return res.status(400).send("已經有相同的CustID，請更換別的");
      }
      const insertCustomer = new Customer({
        CustID,
        Name,
        Country,
        State,
        Zip,
        City,
        Address,
        Status,
      });
      let customerDataSaved = await insertCustomer.save();
      return res.status(200).json(customerDataSaved);
    }

    // insert order data
    delete req.body.type;
    const { error } = OrderValidate(req.body);
    if (error) {
      console.error(error.message);
      return res.status(400).send(error.message);
    }

    const { OrderID, CustID, TotalAmount, OrdStatus, SalesName, OrderDate } =
      req.body;
    let sameID = await Order.findOne({ OrderID: OrderID });

    if (sameID) {
      return res.status(400).send("已經有相同的OrderID，請更換別的");
    }
    const insertOrder = new Order({
      OrderID,
      CustID,
      TotalAmount,
      OrdStatus,
      SalesName,
      OrderDate,
    });
    let orderSaved = await insertOrder.save();
    res.status(200).json(orderSaved);
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});

//update the data in database
app.put("/CustEdit/:id", async function (req, res) {
  const { error } = EditCustValidate(req.body);
  console.log(error);
  if (error) {
    return res.status(400).send(error.message);
  }
  try {
    let toUpdate = req.body;
    let { id } = req.params;
    if (toUpdate.CustID) {
      let theSame = await Customer.findOne({ CustID: toUpdate.CustID });
      if (theSame) {
        return res.status(400).send("已經有相同的CustID，請使用別的");
      }
    }
    let updateConsequence = await Customer.updateOne({ _id: id }, toUpdate);
    res.status(200).json(updateConsequence);
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});
app.put("/OrdEdit/:id", async function (req, res) {
  const { error } = EditOrdValidate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  try {
    let toUpdate = req.body;
    let { id } = req.params;
    if (toUpdate.OrderID) {
      let theSame = await Order.findOne({ OrderID: toUpdate.OrderID });
      if (theSame) {
        return res.status(400).send("已經有相同的OrderID，請使用別的");
      }
    }
    let updateConsequence = await Order.updateOne({ _id: id }, toUpdate);
    res.status(200).json(updateConsequence);
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
});

//delete data in database
app.delete("/CustDelete/:id", async function (req, res) {
  try {
    let { id } = req.params;
    let deleteConsequence = await Customer.deleteOne({ _id: id });
    res.send(deleteConsequence);
  } catch (e) {
    console.error(e);
  }
});
app.delete("/OrdDelete/:id", async function (req, res) {
  try {
    let { id } = req.params;
    let deleteConsequence = await Order.deleteOne({ _id: id });
    res.send(deleteConsequence);
  } catch (e) {
    console.error(e);
  }
});

app.listen(3503, () => {
  console.log("port 3503 receiving request.");
});
