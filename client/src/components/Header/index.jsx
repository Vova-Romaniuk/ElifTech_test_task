import { Link } from "react-router-dom";

function Header() {
	return (
		<div className='h-[8vh] border-b-2 w-full flex items-center'>
			<Link to='/' className='ml-6'>
				Shop
			</Link>
			<span className='text-gray mx-4'>|</span>
			<Link to='/shopping-card'>Shopping card</Link>
			<span className='text-gray mx-4'>|</span>
			<Link to='/order-history'>History</Link>
		</div>
	);
}

export default Header;
