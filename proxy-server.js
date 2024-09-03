// Requiring express in our server
const express = require("express");
const request = require("request");
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Defining get request at '/' route
app.get("/", function (req, res) {
  res.json("fake server is running!");
});

app.post("/api/checkId2", async (req, res) => {
  console.log("checkId2 ");

  var form_data = new FormData();

  for (var key in req.body) {
    form_data.append(key, req.body[key]);
  }

  try {
    const response = await axios.post(
      "https://bikebox.co.il/crm/api/checkId2",
      req.body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
});


app.post("/api/login", async (req, res) => {
  console.log("login ");

  var form_data = new FormData();

  for (var key in req.body) {
    form_data.append(key, req.body[key]);
  }

  try {
    const response = await axios.post(
      "https://bikebox.co.il/crm/api/login",
      req.body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.post("/api/savePaymentMethod", async (req, res) => {
  console.log("savePaymentMethod ");

  var form_data = new FormData();

  for (var key in req.body) {
    form_data.append(key, req.body[key]);
  }

  try {
    const response = await axios.post(
      "https://bikebox.co.il/crm/api/savePaymentMethod",
      req.body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.post("/api/terminalRegistration", async (req, res) => {
  console.log("terminalRegistration ");

  var form_data = new FormData();

  for (var key in req.body) {
    form_data.append(key, req.body[key]);
  }

  try {
    const response = await axios.post(
      "https://bikebox.co.il/crm/api/terminalRegistration",
      req.body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Setting the server to listen at port 3000
app.listen(3000, function (req, res) {
  console.log("Server is running at port 3000");
});
