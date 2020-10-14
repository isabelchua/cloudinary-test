const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//connect db
mongoose
	.connect(process.env.MONGO_URI, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => console.log("mongoDB connected"))
	.catch(err => console.error(err));

app.use(express.json());

app.use("/user", require("./routes/user"));

app.listen(5000, () => console.log("server started"));
