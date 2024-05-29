'use client';

import { memo, useState } from 'react';
import ReservationForm from './ReservationForm';

const MakeReservation = ({ vehicles, users, locations }) => {
	const [showItems, setShowItems] = useState(false);
	const handleClick = (e) => {
		e.preventDefault();
		setShowItems(!showItems);
	};
	return (
		<div>
			<button type='button' onClick={handleClick}>
				Make a reservation
			</button>
			{showItems ? (
				<ReservationForm
					vehicles={vehicles}
					users={users}
					locations={locations}
				/>
			) : (
				''
			)}
		</div>
	);
};

export default memo(MakeReservation);
