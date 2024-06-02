'use client';

import { useSettingsContext } from '@/state/settingsContext';

const AddSettingsCollection = ({ languages }) => {
	const { state } = useSettingsContext();
	const { settings } = state;
	console.log(settings, 'the settings');
	return (
		<div>
			{!settings
				? ''
				: settings.map((setting, index) => {
						let name = setting.parameter.value[languages[0].language];
						return <div key={index}>{name}</div>;
				  })}
		</div>
	);
};

export default AddSettingsCollection;
