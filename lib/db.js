const mongoose = require("mongoose");
require("dotenv").config();

// * the connection string to mongodb
const uri = process.env.MONGODB_URI;

// * connecting the database
mongoose
	.connect(uri, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log("mongoDB connected"))
	.catch((err) => console.log(err));
