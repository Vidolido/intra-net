'use client';
import { useState } from 'react';

// state/actions
import { getRowHeaders } from '@/utils/helpers/rowHeaders';
import { generateGridTemplate } from '@/utils/functions';

// components
import Headings from './Headings';
import SettingRow from './SettingRow';

const DisplaySettings = ({
	defaultLanguage,
	languages,
	documentId,
	optionsSchema,
	settings,
	optionsForSettings,
}) => {
	const [options, setOptions] = useState(optionsForSettings || []);
	let headings = getRowHeaders(optionsSchema, 'singular') || null;

	// useState(() => {
	// 	if (options.length !== optionsForSettings.length) {
	// 		setOptions(optionsForSettings);
	// 	}
	// });

	let colNo = headings?.collections?.length;
	let gridTemplateColumns = generateGridTemplate(colNo + 1);
	let classes = 'grid border';
	let editClass = `col-span-${colNo + 1}`;

	const handleOptions = (settingId) => {
		// const newOptions = optionsForSettings.map((option) => {
		const newOptions = options.map((option) => {
			if (option._id === settingId) {
				return {
					...option,
					showOptions: !option.showOptions,
				};
			} else {
				return {
					...option,
					showOptions: false,
					options: {
						expand: false,
						edit: false,
					},
				};
			}
		});
		setOptions(newOptions);
	};

	const handleExpand = (settingId) => {
		setOptions((prev) => {
			let newOptions = [...prev];
			let setting = newOptions.find((opt) => opt._id === settingId);
			setting.options.expand = !setting.options.expand;
			return newOptions;
		});
	};

	const handleEdit = (settingId) => {
		setOptions((prev) => {
			let newOptions = [...prev];
			let setting = newOptions.find((opt) => opt._id === settingId);
			setting.options.edit = !setting.options.edit;
			return newOptions;
		});
	};

	return (
		<div classes='w-fill'>
			{/* <div classes='w-[65%]'> */}
			<Headings
				defaultLanguage={defaultLanguage}
				headings={headings}
				classes={classes}
				gridTemplateColumns={gridTemplateColumns}
			/>

			{settings &&
				settings.length > 0 &&
				settings.map((setting) => {
					return (
						<SettingRow
							key={setting._id}
							defaultLanguage={defaultLanguage}
							languages={languages}
							documentId={documentId}
							optionsSchema={optionsSchema}
							setting={setting}
							option={options.find(
								(option) => option._id.toString() === setting._id.toString()
							)}
							handleOptions={handleOptions}
							handleExpand={handleExpand}
							handleEdit={handleEdit}
							classes={classes + ' hover:border-b-red-400'}
							numberOfCollections={colNo + 1}
							editClass={editClass}
							gridTemplateColumns={gridTemplateColumns}
						/>
					);
				})}
		</div>
	);
};

export default DisplaySettings;
