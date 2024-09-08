'use client';
// components
import DragSvg from '@/../public/drag.svg';
import { useState } from 'react';
import DisplaySetting from './DisplaySetting';
import Options from './Options';

const SettingRow = ({
	defaultLanguage,
	languages,
	settingId,
	setting,
	classes,
	gridTemplateColumns,
}) => {
	const [options, setOptions] = useState({
		_id: null,
		showOptions: false,
		edit: false,
		expand: false,
	});
	const [visible, setVisible] = useState(false);

	const property = setting?.parameter?.inputValue;
	const collections = setting?.collections;

	const handleShowOptions = (e) => {
		setVisible(!visible);
	};
	return (
		<div className={classes} style={{ gridTemplateColumns }}>
			<div className='border-r'>
				<DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
			</div>

			{/* edit component */}
			{visible && <div>OVA SE OPCIITE</div>}

			{/* view db data component */}
			{!visible && (
				<DisplaySetting
					defaultLanguage={defaultLanguage}
					property={property}
					collections={collections}
				/>
			)}

			{/* button component */}
			<Options onClick={handleShowOptions} />
			{/* <div className='border-r px-3'>
				<button onClick={handleClick}>ClickME</button>
			</div> */}
		</div>
	);
};

export default SettingRow;
