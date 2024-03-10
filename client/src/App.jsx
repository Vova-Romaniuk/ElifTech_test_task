import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./pages";

const router = createBrowserRouter(routes);

function App() {
	return (
		<div className='w-full h-screen flex overflow-hidden'>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
