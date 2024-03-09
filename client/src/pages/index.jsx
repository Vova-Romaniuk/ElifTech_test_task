import Shop from "./Shop";
import Layout from "../components/Layout";

export const routes = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Shop />,
			},
		],
	},
];
