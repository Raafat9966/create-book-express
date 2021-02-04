const router = require("express").Router();
const db = require("../models/db");

module.exports = () => {
	// * create home page route
	router.get("/", (req, res) => {
		db.getBooks()
			.then((books) => res.status(200).render("home", { books }))
			.catch((error) => res.status(500).render("home", { books: [] }));
	});

	// * create addbook route and render the add-book page
	router.get("/addbook", (req, res) => res.status(200).render("add-book"));

	// * post request to add book in the mongoDB
	router.post("/addbook", (req, res) => {
		let { title, author, summary, publishDate } = req.body;

		db.addBook(title, author, summary, publishDate)
			.then(() => {
				req.flash("success", "The Book has been added.");
				res.locals.message = req.flash();
				res.status(200).render("add-book");
			})
			.catch((err) => res.status(400).send(err));
	});

	router.get("/find", (req, res) => {
		var bookSearch = req.query.search;
		console.log(req.query);
		db.findBook(bookSearch)
			.then((books) => res.status(200).render("home", { books }))
			.catch((error) => res.status(500).render("home", { books: [] }));
	});

	return router;
};
