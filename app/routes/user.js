
const User = require('../models/userModel');
const verifyToken = require('../helpers/jwtHelper');

module.exports = function(router, app) {

	router.post('/createUsers', verifyToken, function(req, res) {
		const name = req.body.name;
		const email = req.body.email;
		const dob = req.body.dob;

		User.bulkWrite([
			{ insertOne : { "document": { "name": name, "email": email, "dob": dob } } }
			], function(err, result) {
				if (err) {
					res.send(err);
				} else {
					res.send("File Uploaded Successfully, Click Back Button to go back to form");
				}
			});
	});

	router.post('/editUser', function(req, res) {
		const userId = req.body.id;
		const newUsername = req.body.newUsername;
		const newName = req.body.newName;
		const newEmail = req.body.newEmail;
		const newNumber = req.body.newNumber;

		User.bulkWrite([
			{ updateOne: {
				filter: { _id: userId, active: true },
				update: { $set: { "username": newUsername, "name": newName, "email": newEmail, number: newNumber } }
			} }
			], function(err, result) {
				if (err) {
					console.log(err);
				} else {
					res.send('result');
				}
		});
	});

	return router;
}