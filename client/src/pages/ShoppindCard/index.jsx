import { useShoppingCard } from "../../components/ShoppingCardProvider";

function ShoppingCard() {
	const {
		shoppingCard,
		updateShoppingCardItemQuantity,
		removeFromShoppingCard,
	} = useShoppingCard();

	const calculateTotal = () => {
		return shoppingCard.items.reduce((total, product) => {
			return total + product.price * product.quantity;
		}, 0);
	};

	const changeQuantity = (id, newQuantity) => {
		updateShoppingCardItemQuantity(id, +newQuantity);
	};

	const removeProductWithCard = (id) => {
		removeFromShoppingCard(id);
	};

	return (
		<div className='w-full h-full flex'>
			<div className='w-5/12 h-full'></div>
			<div className='w-7/12 h-full '>
				<div className='flex w-10/12 mx-auto gap-4 h-5/6 flex-col py-5 overflow-y-auto'>
					{shoppingCard.items.map((item) => (
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
				</div>
			</div>
		</div>
	);
}

export default ShoppingCard;
