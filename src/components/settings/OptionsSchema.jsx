'use client';

import { useState } from 'react';

const OptionsSchema = ({ children }) => {
	const [show, setShow] = useState(true);
	const handleOnClick = (e) => {
		setShow(!show);
	};
	return (
		<div
			className={`flex flex-col gap-1 bg-slate-100 border-[1px] border-slate-100 p-[1px] rounded ${
				!show ? 'h-[30px] overflow-hidden' : ''
			}`}
			onClick={handleOnClick}>
			{children}
		</div>
	);
};

export default OptionsSchema;
