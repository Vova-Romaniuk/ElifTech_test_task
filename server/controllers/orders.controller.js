const connection = require("../config/db.config");

async function getOrders(req, res) {
	try {
		const query = `
		  SELECT o.*, od.id as detail_id, od.product_id, od.quantity, p.image_url, p.name, p.price
		  FROM orders o
		  JOIN order_details od ON o.id = od.order_id
		  JOIN products p ON od.product_id = p.id
		`;
		const data = await connection.promise().query(query);

		const orders = {};
		data[0].forEach((row) => {
			const orderId = row.id;
			if (!orders[orderId]) {
				orders[orderId] = {
					order_id: row.id,
					order_date: row.date,
					total_price: row.total_price,
					user_name: row.user_name,
					email: row.email,
					phone: row.phone,
					address: row.address,
					details: [],
				};
			}

			orders[orderId].details.push({
				detail_id: row.detail_id,
				product_id: row.product_id,
				quantity: row.quantity,
				product: {
					image_url: row.image_url,
					name: row.name,
					price: row.price,
				},
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
		const {
			date,
			total_price,
			pharmacy_name,
			details,
			user_name,
			email,
			phone,
			address,
		} = req.body;

		const insertOrderQuery = `
			INSERT INTO orders (date, total_price, pharmacy_name, user_name, email, phone, address)
			VALUES (?, ?, ?, ?, ?, ?, ?);
		`;

		const [orderResult] = await connection
			.promise()
			.execute(insertOrderQuery, [
				date,
				total_price,
				pharmacy_name,
				user_name,
				email,
				phone,
				address,
			]);

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
					detail.id,
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
