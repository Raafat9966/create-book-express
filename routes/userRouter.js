const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../models/userModel");
const { userValidationRules, validate } = require("../middleware/validator");

router.post("/login", async (req, res) => {
	try {
		let { name, password } = req.body;
		let result = await db.loginUser(name, password);
		if (result === "name") {
			req.flash("user", "The user is not registered.");
			res.locals.message = req.flash();
			res.status(200).render("home");
		} else if (result === "password") {
			req.flash("user", "password doesn't match.");
			res.locals.message = req.flash();
			res.status(200).render("home");
		} else {
			let token = jwt.sign({ result }, "secret");
			res.cookie("authCookie", token, { maxAge: 10000000 });
			res.status(200).redirect("/books");
		}
	} catch (err) {
		res.send(err);
	}
});
router.post("/register", userValidationRules(), validate, async (req, res) => {
	try {
		let { name, password } = req.body;
		await db.addUser(name, password);
		req.flash("newUser", "The user has been added.");
		res.locals.message = req.flash();
		res.status(201).render("home");
	} catch (err) {
		res.send(err);
	}
});
router.get("/logout", (req, res) => {
	res.clearCookie("authCookie");
	res.render("home");
});

router.get("/register", (req, res) => {
	res.status(200).render("register");
});

module.exports = router;
