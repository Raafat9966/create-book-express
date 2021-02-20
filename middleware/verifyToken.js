const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
	try {
		const authCookie = req.cookies.authCookie;
		if (!authCookie) {
			res.status(403).send("login first");
		} else {
			jwt.verify(authCookie, "secret");
			next();
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports = verifyToken;
