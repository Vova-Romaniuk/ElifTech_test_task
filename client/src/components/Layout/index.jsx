import Header from "../Header";
import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<div className='h-full w-full flex flex-col'>
			<Header />
			<div className='h-[92vh] w-full'>
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
