const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
	try {
		const authCookie = req.cookies.authCookie;
		if (!authCookie) {
			req.flash("newUser", "You must login first.");
			res.locals.message = req.flash();
			res.status(403).render("home");
		} else {
			jwt.verify(authCookie, "secret");
			next();
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports = verifyToken;
