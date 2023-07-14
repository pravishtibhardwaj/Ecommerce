import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import color from "colors";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import path from "path";
//configure env
dotenv.config();

//database config
connectDB();
//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build ")));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

// app.use("/auth", authRoute);
// app.use("/category", categoryRoute);
// app.use("/product", productRoute);
//rest api

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "/.client/build/index.html"));
});
// app.get("/", (req, res) => {
//   res.send({
//     message: "welcome to ecommerce website",
//   });
// });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.bgGreen.white);
});
