const router = require("express").Router();
const db = require("../models/bookModel");

// const httpErrors = require("http-errors");
// createError(401, 'Please login to view this page.')

// * create home page route
router.get("/", (req, res) => {
	db.getBooks()
		.then((books) => res.status(200).render("books", { books }))
		.catch((error) => res.status(500).render("books", { books: [] }));
});

// * create add-book route and render the add-book page
router.get("/add-book", (req, res) => res.status(200).render("add-book"));

// * post request to add book in the mongoDB
router.post("/add-book", (req, res) => {
	let { title, author, summary, publishDate } = req.body;

	db.addBook(title, author, summary, publishDate)
		.then(() => {
			req.flash("success", "The Book has been added.");
			res.locals.message = req.flash();
			res.status(200).render("add-book");
		})
		.catch((err) => res.status(400).send(err));
});

router.get("/find", async (req, res) => {
	try {
		let bookSearch = req.query.search;

		let books = await db.findBook(bookSearch);
		console.log(books);
		if (books.length === 0) {
			req.flash("missing", "The Book was not found.");
			res.locals.message = req.flash();
			res.status(500).render("books", { books: [] });
		} else res.status(200).render("books", { books });
	} catch (err) {
		res.status(500).render("books", { err });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		await db.deleteBook(req.params.id);
		res.redirect("/books");
	} catch (err) {
		res.status(500).send(err);
	}
});

router.get("/edit/:id", async (req, res) => {
	console.log(req.params.id);
	try {
		let book = await db.findBookById(req.params.id);
		console.log(book);
		res.status(200).render("edit-book", { book });
	} catch (err) {
		res.status(500).render("edit-book", { err });
	}
});

router.put("/edit/:id", async (req, res) => {
	let { title, author, summary, publishDate } = req.body;
	db.editBook(req.params.id, title, author, summary, publishDate)
		.then((book) => {
			req.flash("success", "The Book has been edited.");
			res.locals.message = req.flash();
			res.status(200).render("edit-book", { book });
		})
		.catch((err) => res.status(400).send(err));
});

module.exports = router;
