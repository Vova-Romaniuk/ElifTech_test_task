import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import { apiClient } from "../../apiClient";
import Accordion from "../../components/Accordion";
import InputWrapper from "../../components/InputWrapper";

function OrderHistory() {
	const [orders, setOrders] = useState([]);
	const [originalOrders, setOriginalOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchText, setSearchText] = useState("");

	const fetchOrders = async () => {
		try {
			setIsLoading(true);

			const response = await apiClient.get(
				`${import.meta.env.VITE_API_URL}/orders`
			);

			const { data } = response;
			setOrders(data);
			setOriginalOrders(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSetSearchText = ({ target }) => {
		const { value } = target;
		setSearchText(value);
	};

	const handleSearch = () => {
		const results = originalOrders.filter((order) => {
			const orderString = JSON.stringify(order).toLowerCase();
			return orderString.includes(searchText.toLowerCase());
		});

		setOrders(results);
	};

	useEffect(() => {
		if (searchText.trim() === "") {
			setOrders(originalOrders);
		} else {
			handleSearch();
		}
	}, [searchText, originalOrders]);

	useEffect(() => {
		fetchOrders();
	}, []);

	return (
		<div className='w-full h-full flex flex-col'>
			<div className='h-2/6 w-full'>
				<div className='w-10/12 mx-auto flex flex-col'>
					<p className='mt-20 text-center'>Search your order</p>
					<InputWrapper
						value={searchText}
						inputName='search'
						labelValue='Search'
						onChange={handleSetSearchText}
						placeholder='input your search data'
					/>
				</div>
			</div>
			{isLoading ? (
				<div className='h-4/6 w-full'>
					<Spinner />
				</div>
			) : (
				<div className='h-4/6 w-full overflow-y-auto'>
					<div className='w-10/12 mx-auto h-fit flex flex-col gap-5 py-5'>
						{orders?.map((item) => (
							<Accordion
								date={item.date}
								total_price={item.total_price}
								details={item.details}
								name={item.user_name}
								address={item.address}
								email={item.email}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default OrderHistory;
