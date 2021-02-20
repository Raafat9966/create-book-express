const mongoose = require("mongoose");

// * creating the schema for the documents
const Schema = mongoose.Schema;
const bookSchema = new Schema({
	title: {
		required: true,
		type: String,
	},
	author: {
		required: true,
		type: String,
	},
	summary: {
		required: true,
		type: String,
	},
	publishDate: {
		required: true,
		type: Number,
	},
});

const Book = mongoose.model("books", bookSchema);

// * adding a book to the database
/**
 *
 * @param {String} title
 * @param {String} author
 * @param {String} summary
 * @param {number} publishDate
 */
const addBook = (title, author, summary, publishDate) => {
	return new Promise((res, rej) => {
		const book = new Book({
			title,
			author,
			summary,
			publishDate,
		});
		book.save()
			.then(() => {
				res();
			})
			.catch((err) => rej(err));
	});
};

// * retrieving the books from the database
const getBooks = () => {
	return new Promise((res, rej) => {
		Book.find()
			.then((books) => {
				res(books);
			})
			.catch((err) => rej(err));
	});
};

const findBook = (query) => {
	return new Promise((res, rej) => {
		Book.find({ title: query })
			.then((book) => {
				res(book);
			})
			.catch((err) => rej(err));
	});
};

// * export the modules
module.exports = {
	addBook,
	getBooks,
	findBook,
};
