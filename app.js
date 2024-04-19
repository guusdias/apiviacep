const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/", (req, res) => {
  res.render("transfer");
  const csrfToken = req.headers["x-csrf-token"];

  if (csrfToken !== req.body.csrfToken) {
    return res.status(403).send("Invalid CSRF token");
  }

  console.log("Form Data:", req.body);

  res.status(200).send("Form submitted successfully!");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
