const express = require("express");
const app = express();
const port = 4007;
const bodyParser = require("body-parser");
const db = require("./services/db");
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));
app.use(cors());

app.get("/users", async (req, res) => {
  const result = await db.query("select * from users");
  res.json({
    message: "Hello CPE WorkShop Day 2 !!",
    data_result: result,
  });
});

app.get("/getUserByFirstName", async (req, res) => {
  const { firstname } = req.query;
  if (firstname) {
    const result = await db.query("select * from users where firstname = ? ", [
      firstname,
    ]);
      res.json(result);

  } else {
    const result = await db.query("select * from users");
          res.json(result);
  }
});

app.get("/category", async (req, res) => {
  const result = await db.query("select * from categories");
  res.json({
    message: "Hello CPE WorkShop Day 2 !!",
    data_result: result,
  });
});

app.get("/products", async (req, res) => {
  const result = await db.query("select * from products");
  res.json({
    message: "Hello CPE WorkShop Day 2 !!",
    data_result: result,
  });
});
app.get("/product_details", async (req, res) => {
  const result = await db.query("select * from product_details");
  res.json({
    message: "Hello CPE WorkShop Day 2 !!",
    data_result: result,
  });
});

app.get("/product_join", async (req, res) => {
  const result = await db.query(`
        SELECT * 
        FROM products
        INNER JOIN product_details ON products.product_id = product_details.product_id
        INNER JOIN categories ON products.category_id = categories.category_id
    `);
  res.json({
    message: "Hello CPE WorkShop Day 2 !!",
    data_result: result,
  });
});

app.post("/users", async (req, res) => {
  const { username, password, firstname, lastname, email, phonenumber } =
    req.body;

  const result = await db.query(
    `
        INSERT INTO users (username, password, firstname, lastname, email, phonenumber)
        VALUES(?, ?, ?, ?, ?, ?)
    `,
    [username, password, firstname, lastname, email, phonenumber]
  );

  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
