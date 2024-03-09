import { useState, useEffect } from "react";
import Spinner from "../Spinner";
import { apiClient } from "../../apiClient";

function Sidebar({ setPharmacyId, pharmacyId }) {
	const [pharmacies, setPharmacies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchPharmacies = async () => {
		try {
			setIsLoading(true);

			const response = await apiClient.get(
				`${import.meta.env.VITE_API_URL}/pharmacies`
			);

			const { data } = response;

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

	return (
		<div className='w-4/12 h-full flex flex-col border-r-2'>
			{isLoading ? (
				<Spinner />
			) : (
				<div className='w-10/12 mx-auto flex flex-col gap-5'>
					{pharmacies.map((item) => (
						<div
							className={`h-20 first:mt-3 w-full rounded-md cursor-pointer hover:scale-110 duration-200 border flex items-center ${
								pharmacyId === item.id && "scale-110"
							}`}
							key={item.id}
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
								{item.id}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Sidebar;