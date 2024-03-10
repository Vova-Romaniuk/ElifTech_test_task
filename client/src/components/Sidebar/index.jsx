import { useState, useEffect } from "react";
import Spinner from "../Spinner";
import { apiClient } from "../../apiClient";
import { useShoppingCard } from "../ShoppingCardProvider";

function Sidebar({ setPharmacyId, pharmacyId }) {
	const [pharmacies, setPharmacies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { shoppingCard } = useShoppingCard();

	const fetchPharmacies = async () => {
		try {
			setIsLoading(true);

			const response = await apiClient.get(
				`${import.meta.env.VITE_API_URL}/pharmacies`
			);

			const { data } = response;
			console.log(typeof data);
			setPharmacies(data);
		} catch (error) {
			console.log("error");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchPharmacies();
	}, []);

	const handleSetPharmacyId = (id) => {
		setPharmacyId(id);
	};

	const checkDisabledPharmacies = (pharmacyId) => {
		if (shoppingCard.items.length === 0) {
			return false;
		}

		const existingItem = shoppingCard.items.find(
			(item) => item.pharmacyId === pharmacyId
		);

		return !existingItem || existingItem.pharmacyId !== pharmacyId;
	};

	return (
		<div className='w-4/12 h-full flex flex-col border-r-2'>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='w-10/12 mx-auto flex flex-col gap-5'>
					{pharmacies.length > 0 &&
						pharmacies?.map((item) => (
							<button
								className={`h-20 disabled:cursor-not-allowed first:mt-3 w-full rounded-md cursor-pointer hover:scale-110 duration-200 border flex items-center ${
									pharmacyId === item.id && "scale-110"
								}`}
								key={item.id}
								disabled={checkDisabledPharmacies(item.id)}
								onClick={() => handleSetPharmacyId(item.id)}>
								<div className='h-20 w-20 overflow-hidden'>
									<img
										src={item.icon_url}
										className='w-full h-full object-cover'
										alt={item.name}
									/>
								</div>
								<span className='text-2xl ml-4'>
									{item.name}
								</span>
							</button>
						))}
				</div>
			)}
		</div>
	);
}

export default Sidebar;
