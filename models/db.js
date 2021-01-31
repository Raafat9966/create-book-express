const mongoose = require("mongoose");

// * the connection string to mongodb
require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gajnn.gcp.mongodb.net/book-database?retryWrites=true&w=majority`;

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

// * connecting the database
const connect = () => {
	return new Promise((res, rej) => {
		if (mongoose.connection.readyState === 1) {
			res();
		} else {
			mongoose
				.connect(uri, {
					useUnifiedTopology: true,
					useCreateIndex: true,
					useNewUrlParser: true,
				})
				.then(() => {
					res();
				})
				.catch((err) => rej(err));
		}
	});
};

// * adding a book to the database
/**
 *
 * @param {String} title
 * @param {String} author
 * @param {String} summary
 * @param {String} publishDate
 */
const addBook = (title, author, summary, publishDate) => {
	return new Promise((res, rej) => {
		connect()
			.then(() => {
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
			})
			.catch((err) => rej(err));
	});
};

// * retrieving the books from the database
const getBooks = () => {
	return new Promise((res, rej) => {
		connect()
			.then(() => {
				Book.find()
					.then((books) => {
						res(books);
					})
					.catch((err) => rej(err));
			})
			.catch((err) => rej(err));
	});
};

const findBook = (query) => {
	return new Promise((res, rej) => {
		connect()
			.then(() => {
				Book.find({ title: query })
					.then((book) => {
						res(book);
					})
					.catch((err) => rej(err));
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
