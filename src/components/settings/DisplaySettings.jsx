'use client';
import { useSettingsContext } from '@/state/settingsContext';
import { createRandomNumber } from '@/utils/functions';

const DisplaySettings = ({ languages }) => {
	const { settings, defaultLanguage } = useSettingsContext();
	console.log(settings, 'the  settings');
	// let random = createRandomNumber(1, 999);
	// let random = Math.floor(Math.random() * (1 - 999 + 1)) + 1;
	// console.log(random);
	return (
		<div>
			{settings?.map((setting, index) => (
				<div key={createRandomNumber(1, 999)}>
					{setting.parameter.name.singular[defaultLanguage.language]}{' '}
					{setting?.collections?.map(
						(collection) => ' ' + collection.name[defaultLanguage.language]
					)}
				</div>
			))}
		</div>
	);
};

export default DisplaySettings;
