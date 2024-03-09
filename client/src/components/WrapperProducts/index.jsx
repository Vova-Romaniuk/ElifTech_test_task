import Spinner from "../Spinner";
import { useShoppingCard } from "../ShoppingCardProvider";

function WrapperProducts({ isLoading, products, pharmacyId }) {
	const { addToShoppingCard } = useShoppingCard();

	const addProductToChoppingCard = (product) => {
		addToShoppingCard({ ...product, quantity: 1, pharmacyId });
	};

	return (
		<div className='w-8/12 h-full'>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='w-full flex h-full mx-auto p-1 overflow-y-auto'>
					<div className='w-10/12 mx-auto py-10 h-fit grid grid-cols-3 gap-10'>
						{products.map((item) => (
							<div
								className='h-60 w-full flex flex-col border rounded-md'
								key={item.id}>
								<div className='h-4/6 w-full overflow-hidden'>
									<img
										className='w-full h-full object-cover'
										src={item.image_url}
										alt={item.name}
									/>
								</div>
								<div className='h-2/6 w-full flex flex-col'>
									<div className='h-1/2 w-full flex justify-between items-center px-3'>
										<span>{item.name}</span>
										<span>{item.price}$</span>
									</div>
									<div className='h-1/2 flex w-full items-center justify-end'>
										<button
											onClick={() =>
												addProductToChoppingCard(item)
											}
											className='border bg-[#9BACCE] duration-200 hover:bg-[#74829C] text-white rounded-md py-1 px-2 ml-auto mr-3'>
											Add to card
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default WrapperProducts;
