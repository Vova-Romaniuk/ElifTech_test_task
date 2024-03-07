const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

var corsOptions = {
	origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.use(express.json());

const mysql = require("mysql2");

const connection = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

app.get("/hearbeat", (req, res) => {
	res.json({ message: "Welcome to my application." });
});

const PORT = 8080;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
