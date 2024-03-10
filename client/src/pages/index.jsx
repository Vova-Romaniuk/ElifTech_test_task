import Shop from "./Shop";
import Layout from "../components/Layout";
import { ShoppingCardProvider } from "../components/ShoppingCardProvider";
import ShoppingCard from "./ShoppindCard";
import OrderHistory from "./OrderHistory";

export const routes = [
	{
		path: "/",
		element: <ShoppingCardProvider />,
		children: [
			{
				path: "/",
				element: <Layout />,
				children: [
					{
						path: "/",
						element: <Shop />,
					},
					{
						path: "/shopping-card",
						element: <ShoppingCard />,
					},
					{
						path: "/order-history",
						element: <OrderHistory />,
					},
				],
			},
		],
	},
];
