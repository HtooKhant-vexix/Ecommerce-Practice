require("dotenv").config();
const express = require("express");
app = express();
bodyParser = require("body-parser");
mongoose = require("mongoose");
fileUpload = require("express-fileupload");

mongoose.connect(
  // "mongodb://localhost:27017/3000"
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

app.use("/permit", permitRouter);
app.use("/role", roleRouter);
app.use("/user", userRouter);

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
