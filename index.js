const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

//connect db
mongoose
	.connect(process.env.MONGO_URI, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false
	})
	.then(() => console.log("mongoDB connected"))
	.catch(err => console.error(err));

app.use(express.json());

app.use("/user", require("./routes/user"));

app.listen(5002, () => console.log("server started"));
