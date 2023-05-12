import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./route/route.js";
import bodyParser from "body-parser";
const app = express();

//middleware

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Db connection
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://Bayo4real:Bayo4real@hms.qg1nt.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Connection Error", err));

app.use("/api", routes);
// // route middleware
// readdirSync('./route').map((r) => app.use('/api', require(`./route/${r}`)))

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
