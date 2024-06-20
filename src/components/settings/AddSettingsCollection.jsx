'use client';

// state/actions
import { useSettingsContext } from '@/state/settingsContext';

const AddSettingsCollection = ({ languages }) => {
	//   const state = useSettingsContext();
	const { settings } = useSettingsContext();
	//   console.log(state, 'the state');
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
