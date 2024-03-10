function InputWrapper({
	value = "",
	inputName = "",
	labelValue,
	placeholder = "",
	onChange,
	required = false,
}) {
	return (
		<div className='flex flex-col mt-4'>
			<label
				className='text-[#A48BA6] mb-2 font-light text-sm'
				htmlFor={inputName}>
				{labelValue}
			</label>
			<input
				className='border-0 outline-none border-textColor border-b-2 bg-transparent text-textColor text-xl'
				type='text'
				id={inputName}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				name={inputName}
				required={required}
			/>
		</div>
	);
}

export default InputWrapper;
// [
//     {
//         "order_id": 1,
//         "order_date": "2024-03-05T22:00:00.000Z",
//         "total_price": "30.00",
//         "pharmacy_name": "podoroshnutk",
//         "details": [
//             {
//                 "detail_id": 1,
//                 "product_id": 1,
//                 "quantity": 2
//             },
//             {
//                 "detail_id": 2,
//                 "product_id": 3,
//                 "quantity": 1
//             }
//         ]
//     }
// ]
