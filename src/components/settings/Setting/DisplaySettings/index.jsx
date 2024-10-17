'use client';
import { useState } from 'react';

// state/actions
import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { generateGridTemplate } from '@/utils/functions';

// components
import Headings from './Headings';
import SettingRow from './SettingRow';
import { getRowHeaders } from '@/utils/helpers/rowHeaders';

const DisplaySettings = ({
	defaultLanguage,
	languages,
	documentId,
	optionsSchema,
	settings,
	optionsForSettings,
}) => {
	const [options, setOptions] = useState(optionsForSettings || []);
	// let headings =
	// 	(settings && getDisplayHeadings(settings[0], 'singular')) || null;

	let headings = getRowHeaders(optionsSchema, 'singular') || null;

	// console.log(headings, 'headings');
	console.log(options, 'the options');
	let colNo = headings?.collections.length;
	let gridTemplateColumns = generateGridTemplate(colNo + 1);
	let classes = 'grid border';
	let editClass = `col-span-${colNo + 1}`;

	const handleOptions = (settingId) => {
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
		<div classes='w-[65%]'>
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
							option={options.find((option) => option._id === setting._id)}
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

// export default memo(DisplaySettings);
export default DisplaySettings;
