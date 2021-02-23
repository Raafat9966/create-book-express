const express = require("express");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");

const errorHandler = require("./middleware/errorHandle.js");

const app = express();
const bookRouter = require("./routes/bookRoute");
const userRouter = require("./routes/userRouter");
require("./lib/db");

const verifyToken = require("./middleware/verifyToken");

// * creating the message after the submit
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

app.use(methodOverride("_method"));
app.use(cookieParser("secret"));
app.use(session({ cookie: { maxAge: 5000 } }));
app.use(flash());
app.use(morgan("dev"));
app.use(errorHandler);

// * config the .env file
require("dotenv").config();
const port = process.env.PORT || 8080;

// * set encoder and parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * set engine template
app.set("view engine", "ejs");

// * set the public folder to be the static folder in the project
app.use(express.static(path.join(__dirname, "/public")));

// * handle the created routes
app.use("/books", verifyToken, bookRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
	res.render("home");
});

// * handling 404 page not found error
app.use((req, res, next) =>
	res.status(404).render("404", { url: req.url.substring(1) })
);

// * Starting the server on the port
app.listen(port);
