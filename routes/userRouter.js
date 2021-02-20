const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../models/userModel");
const { userValidationRules, validate } = require("../middleware/validator");

router.post("/login", async (req, res, next) => {
	try {
		let { name, password } = req.body;
		let user = await db.loginUser(name, password);
		let token = await jwt.sign({ user }, "secret");
		res.cookie("authCookie", token, { maxAge: 10000 });
		res.status(200).redirect("/books");
	} catch (err) {
		next(err);
	}
});
router.post(
	"/register",
	userValidationRules(),
	validate,
	async (req, res, next) => {
		try {
			let { name, password } = req.body;
			await db.addUser(name, password);
			req.flash("useradd", "The user has been added.");
			res.locals.message = req.flash();
			res.status(201).redirect("/");
		} catch (err) {
			next(err);
		}
	}
);
router.get("/logout", (req, res) => {
	res.clearCookie("authCookie");
	res.redirect("/");
});

router.get("/register", (req, res) => {
	res.status(200).render("register");
});

module.exports = router;
