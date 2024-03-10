import { useState } from "react";
import { formatDateTime } from "../../helpers";
function Accordion({
	date,
	total_price,
	details,
	name,
	address,
	email,
	phone,
}) {
	const [isShowProducts, setIsShowProducts] = useState(false);

	const toggleAccordion = () => {
		setIsShowProducts(!isShowProducts);
	};

	return (
		<div className='h-fit w-full flex flex-col border rounded-md'>
			<div className='h-20 w-full flex flex-col px-10'>
				<div className='flex h-full justify-between w-full items-center'>
					<span>Name: {name}</span>
					<span>Email: {email}</span>
					<span>Address: {address}</span>
				</div>
				<div className='flex h-full justify-between w-full'>
					<span>Date: {formatDateTime(date)}</span>
					<span>Total price: {total_price}</span>
					{isShowProducts ? (
						<button onClick={toggleAccordion}>
							Hidden products{" "}
							<i className='fa-solid fa-chevron-up'></i>
						</button>
					) : (
						<button onClick={toggleAccordion}>
							Show products{" "}
							<i className='fa-solid fa-chevron-down'></i>
						</button>
					)}
				</div>
			</div>
			{isShowProducts && (
				<div className='w-full h-fit py-7 grid grid-cols-3 gap-5 px-10'>
					{details?.map((item) => (
						<div
							className='h-36 w-full flex flex-col border rounded-md'
							key={item.product_id}>
							<div className='h-4/6 w-full overflow-hidden'>
								<img
									className='w-full h-full object-cover'
									src={item.product.image_url}
									alt={item.product.name}
								/>
							</div>
							<div className='h-2/6 w-full flex flex-col'>
								<div className='h-1/2 w-full flex justify-between items-center px-3'>
									<span>{item.product.name}</span>
									<span>{item.product.price}$</span>
								</div>
								<div className='h-1/2 flex w-full items-center justify-end'>
									<span>Quantity: {item.quantity}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Accordion;
