import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import WrapperProducts from "../../components/WrapperProducts";
import { apiClient } from "../../apiClient";

function Shop() {
	const [pharmacyId, setPharmacyId] = useState(1);
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchProducts = async () => {
		try {
			setIsLoading(true);

			const response = await apiClient.get(
				`${import.meta.env.VITE_API_URL}/products/${pharmacyId}`
			);

			const { data } = response;

			setProducts(data);
		} catch (error) {
			console.log("error");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (pharmacyId !== 0) fetchProducts();
	}, [pharmacyId]);

	return (
		<div className='w-full h-full flex'>
			<Sidebar pharmacyId={pharmacyId} setPharmacyId={setPharmacyId} />
			<WrapperProducts
				pharmacyId={pharmacyId}
				isLoading={isLoading}
				products={products}
			/>
		</div>
	);
}

export default Shop;
