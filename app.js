const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("colors");
const fileUpload = require("express-fileupload");
const connectDb = require("./config/db");
const { unknownEndpoints, errorHandler } = require("./middleware/error");
const app = express();

dotenv.config({ path: "./config/config.env" });

connectDb();
//rouets
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
const serviceRouter = require("./routes/services");
const contactUsRouter = require("./routes/contact-us");
app.use(express.json());

app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/contact-us", contactUsRouter);


app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use(unknownEndpoints);
app.use(errorHandler)

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //close the server
  server.close(() => process.exit(1));
});
