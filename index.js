const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const cors = require("cors");

const departments = require("./routes/departments");

const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/departments")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1/departments", departments);

app.get("/", (req, res) => {
  res.send("Digital Ethiopia Api");
});

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listing on port ${port}...`));
