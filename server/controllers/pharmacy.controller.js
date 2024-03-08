const connection = require("../config/db.config");

async function getPharmacies(req, res) {
	try {
		const data = await connection
			.promise()
			.query(`SELECT *  FROM pharmacy;`);
		res.json(data[0]);
	} catch (err) {
		res.status(500).json({
			message: err,
		});
	}
}

module.exports = {
	getPharmacies,
};
