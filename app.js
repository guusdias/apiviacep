const express = require("express");
const bodyParser = require("body-parser");

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

app.post("/transfer", (req, res) => {
  const csrfToken = req.body.csrfToken;

  console.log(csrfToken);
  console.log(req.headers["x-csrf-token"]);
  console.log("Form Data:", req.body);

  if (csrfToken !== req.headers["x-csrf-token"]) {
    return res.status(403).json("Invalid CSRF token");
  }

  console.log("Form Data:", req.body);

  res.status(200).json("Form submitted successfully!");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
