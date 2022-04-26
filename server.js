
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const qs = require('qs');
const router = express.Router();
const session = require('express-session');
const http = require('http');
const fs = require("fs");
const mongoose = require('mongoose');

const loginRoutes = require('./app/routes/login')(router);
const userRoutes = require('./app/routes/user')(router);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/login', loginRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.sendFile('/views/index.html', { root: __dirname });
});

mongoose.connect('mongodb+srv://shubham:lm109584s.s.@cluster0.zoeqo.mongodb.net/myFirstDatabase?appName=mongosh+1.3.1', { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
	if (err) {
		console.log('Not connected to db');
	} else {
		console.log("Successfully connected to db");
	}
});

const httpServer = http.createServer(app);
const port = 3000;

httpServer.listen(port, () => {
	console.log(`Test app listening on port ${port}`);
});