
const jwt = require('jsonwebtoken');
const secret = 'harry potter';
const Login = require('../models/loginModel');
const verifyToken = require('../helpers/jwtHelper');

module.exports = function(router, app) {

	router.post('/loginUser', (req, res) => {
		const login = new Login();
		login.username = req.body.username;
		login.password = req.body.password;
		login.token = jwt.sign({ username: login.username }, secret);

		if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '') {
			res.json({ success: false, message: "Please ensure if every detail is provided" });
		} else {
			login.save((err, login) => {
				if (err) {
					res.json({ success: false, message: 'Some Error' })
				} else {
					res.status(200).json({ success: true, message: "User Registered Successfully" });
				}
			});
		}
	});

	router.post('/authenticate', (req, res) => {
		Login.findOne({ username: req.body.username }).exec((err, user) => {
			if (err) {
				return res.status(500).json(err);
			}
			if (!user) {
				return res.json({ success: false, message: 'Could not find user' });
			} else if (user) {
				if (req.body.password) {
					const validPassword = req.body.password;
				} else {
					return res.json({ success: false, message: 'No password provided' });
				}
				const validPassword = req.body.password;
				if (!validPassword) {
					return res.json({ success: false, message: 'Could not authenticate password' });
				} else {
					const token = jwt.sign({ username: user.username, _id: user._id }, secret);
					res.status(200).json({ success: true, message: 'User Authenticated', token: token });
				}
			}
		});
	});

	return router;
}