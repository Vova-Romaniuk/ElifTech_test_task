import { useState } from "react";
import { useShoppingCard } from "../../components/ShoppingCardProvider";
import InputWrapper from "../../components/InputWrapper";
import { apiClient } from "../../apiClient";
import { useNavigate } from "react-router-dom";

function ShoppingCard() {
	const [order, setOrder] = useState({
		date: new Date(),
		total_price: 0,
		pharmacy_name: "default",
		details: [],
		user_name: "",
		email: "",
		phone: "",
		address: "",
	});

	const navigate = useNavigate();

	const {
		shoppingCard,
		updateShoppingCardItemQuantity,
		clearShoppingCard,
		removeFromShoppingCard,
	} = useShoppingCard();

	const calculateTotal = () => {
		return shoppingCard.items.reduce((total, product) => {
			return total + product.price * product.quantity;
		}, 0);
	};

	const setName = ({ target }) => {
		const { value } = target;
		setOrder({ ...order, user_name: value });
	};

	const setEmail = ({ target }) => {
		const { value } = target;
		setOrder({ ...order, email: value });
	};

	const setPhone = ({ target }) => {
		const { value } = target;
		setOrder({ ...order, phone: value });
	};

	const setAddress = ({ target }) => {
		const { value } = target;
		setOrder({ ...order, address: value });
	};

	const changeQuantity = (id, newQuantity) => {
		updateShoppingCardItemQuantity(id, +newQuantity);
	};

	const removeProductWithCard = (id) => {
		removeFromShoppingCard(id);
	};

	const createOrder = async (e) => {
		e.preventDefault();

		try {
			await apiClient
				.post(`${import.meta.env.VITE_API_URL}/order`, {
					...order,
					details: shoppingCard.items,
					total_price: +calculateTotal().toFixed(2),
				})
				.then(() => {
					navigate("/");
					clearShoppingCard();
				});
		} catch (error) {
			console.log("error");
		}
	};

	return (
		<form onSubmit={createOrder} className='w-full h-full flex'>
			<div className='w-5/12 h-full flex flex-col'>
				<div className='w-9/12 h-4/6 flex flex-col m-auto justify-between'>
					<InputWrapper
						inputName='name'
						labelValue='Name:'
						placeholder='input your name'
						onChange={setName}
						value={order.user_name}
						required
					/>
					<InputWrapper
						inputName='email'
						labelValue='Email:'
						placeholder='input your email'
						onChange={setEmail}
						value={order.email}
						required
					/>
					<InputWrapper
						inputName='phone'
						labelValue='Phone:'
						placeholder='input your phone'
						onChange={setPhone}
						value={order.phone}
						required
					/>
					<InputWrapper
						inputName='address'
						labelValue='Address:'
						placeholder='input your address'
						value={order.address}
						onChange={setAddress}
						required
					/>
				</div>
			</div>
			<div className='w-7/12 h-full '>
				<div className='flex w-10/12 mx-auto gap-4 h-5/6 flex-col py-5 overflow-y-auto'>
					{shoppingCard.items?.map((item) => (
						<div
							className='h-60 w-full flex border rounded-md relative'
							key={item.id}>
							<button
								onClick={() => removeProductWithCard(item.id)}
								className='absolute top-3 right-3 text-4xl text-red-600 hover:scale-110 duration-200 cursor-pointer'>
								×
							</button>
							<div className='h-full w-5/12 overflow-hidden border-r-2'>
								<img
									className='w-full h-full object-cover'
									src={item.image_url}
									alt={item.name}
								/>
							</div>
							<div className='h-full w-7/12 flex flex-col'>
								<div className='h-1/2 w-full flex justify-between items-center px-3'>
									<span>{item.name}</span>
									<span>{item.price}$</span>
								</div>
								<div className='h-1/2 flex w-full items-center justify-end'>
									<input
										className='w-10 border'
										onChange={(e) =>
											changeQuantity(
												item.id,
												e.target.value
											)
										}
										type='number'
										value={item.quantity}
										min='1'
									/>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className='ml-16 h-1/6 w-full flex flex-col mt-5'>
					<span>Total Price: {calculateTotal().toFixed(2)}$</span>
					<button
						type='submit'
						className='border bg-[#9BACCE] duration-200 text-3xl hover:bg-[#74829C] text-white rounded-md py-3 px-4 ml-auto mx-auto'>
						Submit
					</button>
				</div>
			</div>
		</form>
	);
}

export default ShoppingCard;
