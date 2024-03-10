import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Outlet } from "react-router-dom";

const ShoppingCardContext = createContext();

const shoppingCardReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_SHOPPING_CARD":
			return {
				...state,
				items: [...state.items, action.payload],
			};
		case "REMOVE_FROM_SHOPPING_CARD":
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload),
			};
		case "UPDATE_SHOPPING_CARD_ITEM_QUANTITY":
			return {
				...state,
				items: state.items?.map((item) =>
					item.id === action.payload.itemId
						? { ...item, quantity: action.payload.quantity }
						: item
				),
			};
		case "CLEAR_SHOPPING_CARD":
			return {
				...state,
				items: [],
			};
		case "LOAD_SHOPPING_CARD_FROM_LOCAL_STORAGE":
			return {
				...state,
				items: action.payload,
			};
		default:
			return state;
	}
};

const ShoppingCardProvider = () => {
	const [shoppingCard, dispatch] = useReducer(shoppingCardReducer, {
		items: [],
	});

	const addToShoppingCard = (item) => {
		const existingItem = shoppingCard.items.find(
			(shoppingCardItem) => shoppingCardItem.id === item.id
		);

		if (!existingItem) {
			dispatch({ type: "ADD_TO_SHOPPING_CARD", payload: item });
		}
	};

	const clearShoppingCard = () => {
		dispatch({ type: "CLEAR_SHOPPING_CARD" });
		localStorage.setItem("cardData", JSON.stringify([]));
	};
	const removeFromShoppingCard = (itemId) => {
		dispatch({ type: "REMOVE_FROM_SHOPPING_CARD", payload: itemId });
	};

	const updateShoppingCardItemQuantity = (itemId, quantity) => {
		dispatch({
			type: "UPDATE_SHOPPING_CARD_ITEM_QUANTITY",
			payload: { itemId, quantity },
		});
	};

	const loadShoppingCardFromLocalStorage = () => {
		const savedShoppingCard = JSON.parse(
			localStorage.getItem("cardData") || "[]"
		);
		dispatch({
			type: "LOAD_SHOPPING_CARD_FROM_LOCAL_STORAGE",
			payload: savedShoppingCard,
		});
	};

	useEffect(() => {
		if (shoppingCard.items.length > 0)
			localStorage.setItem(
				"cardData",
				JSON.stringify(shoppingCard.items)
			);
	}, [shoppingCard]);

	useEffect(() => {
		loadShoppingCardFromLocalStorage();
	}, []);

	return (
		<ShoppingCardContext.Provider
			value={{
				shoppingCard,
				addToShoppingCard,
				removeFromShoppingCard,
				updateShoppingCardItemQuantity,
				clearShoppingCard,
			}}>
			<Outlet />
		</ShoppingCardContext.Provider>
	);
};

const useShoppingCard = () => {
	const context = useContext(ShoppingCardContext);
	if (!context) {
		throw new Error(
			"useShoppingCard must be used within a ShoppingCardProvider"
		);
	}
	return context;
};

export { ShoppingCardProvider, useShoppingCard };
