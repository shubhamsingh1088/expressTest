
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true, select: false },
	token: { type: String, required: true }
});

module.exports = mongoose.model('Logins', loginSchema);