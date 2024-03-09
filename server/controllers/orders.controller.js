const connection = require("../config/db.config");

async function getOrders(req, res) {
	try {
		const query = `
		SELECT o.id as order_id, o.date as order_date, o.total_price, o.pharmacy_name,
			od.id as detail_id, od.product_id, od.quantity
		FROM orders o
		JOIN order_details od ON o.id = od.order_id;
 
		`;
		const data = await connection.promise().query(query);

		const orders = {};
		data[0].forEach((row) => {
			const orderId = row.order_id;
			if (!orders[orderId]) {
				orders[orderId] = {
					order_id: row.order_id,
					order_date: row.order_date,
					total_price: row.total_price,
					pharmacy_name: row.pharmacy_name,
					details: [],
				};
			}

			orders[orderId].details.push({
				detail_id: row.detail_id,
				product_id: row.product_id,
				quantity: row.quantity,
			});
		});
		res.json(Object.values(orders));
	} catch (err) {
		console.error("Error in GET /orders:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

async function createOrder(req, res) {
	try {
		const { date, total_price, pharmacy_name, details } = req.body;

		const insertOrderQuery = `
			INSERT INTO orders (date, total_price, pharmacy_name)
			VALUES (?, ?, ?);
		`;

		const [orderResult] = await connection
			.promise()
			.execute(insertOrderQuery, [date, total_price, pharmacy_name]);

		const orderId = orderResult.insertId;

		const insertDetailsQuery = `
			INSERT INTO order_details (order_id, product_id, quantity)
			VALUES (?, ?, ?);
		`;

		for (const detail of details) {
			await connection
				.promise()
				.execute(insertDetailsQuery, [
					orderId,
					detail.product_id,
					detail.quantity,
				]);
		}

		res.status(201).json({ message: "Order added successfully" });
	} catch (err) {
		console.error("Error in POST /orders:", err);
		res.status(500).json({ message: "Internal Server Error" });
	}
}

module.exports = {
	getOrders,
	createOrder,
};
