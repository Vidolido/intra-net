'use client';
import { useCallback, useState } from 'react';

// components
import DragSvg from '@/../public/drag.svg';
import DisplaySetting from './DisplaySetting';
import Options from './Options';
import EditRow from './EditRow';

const SettingRow = ({
	defaultLanguage,
	languages,
	documentId,
	setting,
	option,
	handleOptions,
	handleExpand,
	handleEdit,
	classes,
	numberOfCollections,
	editClass,
	gridTemplateColumns,
}) => {
	// const [currentOption, setCurrentOption] = useState('');
	// const [options, setOptions] = useState(optionsForSettings);
	//   const [visible, setVisible] = useState(false);

	const property = setting?.parameter?.inputValue;
	const collections = setting?.collections;

	// console.log(property, 'the prop');

	// console.log(option, 'OVOA');
	return (
		<div className={classes} style={{ gridTemplateColumns }}>
			<div className='border-r'>
				<DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
			</div>

			{/* edit component */}
			{option.options.edit && (
				<EditRow
					languages={languages}
					documentId={documentId}
					property={property}
					collections={collections}
					setting={setting}
					gridTemplateColumns={gridTemplateColumns}
					numberOfCollections={numberOfCollections}
					classes={editClass}
				/>
			)}
			{/* {option.options.edit && <h2>EDIT</h2>} */}

			{/* view db data component */}
			{!option.options.edit && (
				<DisplaySetting
					defaultLanguage={defaultLanguage}
					property={property}
					collections={collections}
					option={option}
				/>
			)}

			{/* button component */}
			<Options
				documentId={documentId}
				settingId={setting._id}
				option={option}
				onClick={handleOptions}
				handleExpand={handleExpand}
				handleEdit={handleEdit}
			/>
			{/* <div className='border-r px-3'>
				<button onClick={handleClick}>ClickME</button>
			</div> */}
		</div>
	);
};

export default SettingRow;
