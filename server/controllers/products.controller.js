const connection = require("../config/db.config");

async function getProductsByPharmacy(req, res) {
	const { pharmacyId } = req.params;

	try {
		const data = await connection.promise().query(
			`
        SELECT p.*
        FROM products p
        JOIN pharmacy_products pp ON p.id = pp.product_id
        WHERE pp.pharmacy_id = ?
      `,
			[pharmacyId]
		);

		res.json(data[0]);
	} catch (err) {
		console.error("Error in getProductsByPharmacy:", err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
}

module.exports = {
	getProductsByPharmacy,
};
