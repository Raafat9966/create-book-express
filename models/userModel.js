const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.connection.model("users", schema);

const addUser = async (name, password) => {
	let hash = bcrypt.hashSync(password, 10);
	const user = new User({
		name,
		password: hash,
	});
	return await user.save();
};

const loginUser = async (name, password) => {
	let user = await User.findOne({ name });
	if (!user) {
		console.log("user is not registered");
	} else {
		let result = bcrypt.compareSync(password, user.password);
		if (!result) {
			console.log("password doesn't match");
		} else {
			return user;
		}
	}
};

module.exports = {
	addUser,
	loginUser,
};
