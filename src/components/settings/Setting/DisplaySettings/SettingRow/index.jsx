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
	optionsSchema,
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
	const property = setting?.parameter;
	const collections = setting?.collections;
	console.log(setting, 'THE SETTING');
	return (
		<div className={classes} style={{ gridTemplateColumns }}>
			<div className='border-r'>
				<DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' />
			</div>

			{/* edit component */}
			{option?.options?.edit && (
				<EditRow
					languages={languages}
					documentId={documentId}
					optionsSchema={optionsSchema}
					property={property}
					collections={collections}
					setting={setting}
					gridTemplateColumns={gridTemplateColumns}
					numberOfCollections={numberOfCollections}
					classes={editClass}
				/>
			)}

			{/* view db data component */}
			{!option?.options?.edit && (
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
		</div>
	);
};

export default SettingRow;
