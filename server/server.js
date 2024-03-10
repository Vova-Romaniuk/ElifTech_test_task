const express = require("express");
const cors = require("cors");
const app = express();
const pharmacyController = require("./controllers/pharmacy.controller");
const productController = require("./controllers/products.controller");
const orderController = require("./controllers/orders.controller");

var corsOptions = {
	origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/heartbeat", (req, res) => {
	res.json({ message: "Welcome to my application." });
});

const PORT = 8080;

app.get("/pharmacies", pharmacyController.getPharmacies);

app.get("/products/:pharmacyId", productController.getProductsByPharmacy);

app.get("/orders", orderController.getOrders);
app.post("/order", orderController.createOrder);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
