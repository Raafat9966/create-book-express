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
	image: {
		type: String,
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
const addBook = (title, author, summary, publishDate, image) => {
	return new Promise((res, rej) => {
		const book = new Book({
			title,
			author,
			summary,
			publishDate,
			image,
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

const deleteBook = (id) => {
	return new Promise((res, rej) => {
		Book.findByIdAndDelete({ _id: id })
			.then(() => res("success"))
			.catch((err) => rej(err));
	});
};

const findBookById = (id) => {
	return new Promise((res, rej) => {
		Book.findById({ _id: id })
			.then((book) => {
				res(book);
			})
			.catch((err) => rej(err));
	});
};

const editBook = (id, title, author, summary, publishDate) => {
	return new Promise((res, rej) => {
		Book.findByIdAndUpdate(
			{ _id: id },
			{ title, author, summary, publishDate },
			{ new: true }
		)
			.then((book) => {
				res(book);
			})
			.catch((err) => {
				rej(err);
			});
	});
};

// * export the modules
module.exports = {
	addBook,
	getBooks,
	findBook,
	deleteBook,
	findBookById,
	editBook,
};
