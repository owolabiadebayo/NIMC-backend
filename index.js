const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./route/route.js");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB connection
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin100:admin100@waselg.tyesk6d.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Connection Error", err));

app.use("/api", routes);

// Server
const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
