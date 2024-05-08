const morgan = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Routes Import
const itemRoutes = require("./Routes/ItemRoutes");
const userRoutes = require("./Routes/UserRountes");
const userbills = require("./Routes/BillsRout");

dotenv.config();

const connectDB = require("./Config/Config");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Mounting routes
app.use("/api/items", itemRoutes); // Mount Item routes
app.use("/api/users", userRoutes); // Mount Item routes
app.use("/api/bills", userbills); // Mount Item routes

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgBlue);
});
