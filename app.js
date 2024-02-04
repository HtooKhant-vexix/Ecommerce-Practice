require("dotenv").config();
const express = require("express");
app = express();
bodyParser = require("body-parser");
mongoose = require("mongoose");
fileUpload = require("express-fileupload");

mongoose.connect(
  // "mongodb://htookhant:asdffdsa@127.0.0.1:27017"
  "mongodb+srv://htoolay:abcde8.6@cluster0.10bidru.mongodb.net/test?retryWrites=true&w=majority"
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
);

app.use(bodyParser.json());
app.use(fileUpload());

const permitRouter = require("./routes/permit");
const roleRouter = require("./routes/role");
const userRouter = require("./routes/user");
const categoryRoute = require("./routes/category");
const subcatRoute = require("./routes/subcat");
const childcatRoute = require("./routes/childcats");
const tagRoute = require("./routes/tag");
const deli = require("./routes/delivery");
const productRoute = require("./routes/product");

app.use("/permit", permitRouter);
app.use("/role", roleRouter);
app.use("/user", userRouter);
app.use("/user", userRouter);
app.use("/category", categoryRoute);
app.use("/subcat", subcatRoute);
app.use("/childcat", childcatRoute);
app.use("/tag", tagRoute);
app.use("/deli", deli);
app.use("/product", productRoute);

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({ con: false, msg: err.message });
});

const defaultData = async () => {
  const migrator = require("./migrations/migrator");
  await migrator.migrate();
  // await migrator.backup();
  await migrator.rpMigrate();
  await migrator.addOwnerRole();
};

// defaultData();

app.listen(
  process.env.PORT,
  console.log(`Server is running at port ${process.env.PORT}`)
);
