require("dotenv").config();
const { config } = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const employeeRouter = require("./routes/employees");
app.use("/employees", employeeRouter);

app.listen(port, () => console.log(`Server started on port ${port}!`));
