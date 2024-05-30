'use client';
// state/actions
import { useSettingsContext } from '@/state/settingsContext';

// components
import LanguageInputContainer from '../inputs/LanguageInputContainer';

const FormCollections = ({ languages }) => {
	const { state } = useSettingsContext();
	const { collections } = state;

	return (
		<div>
			{collections.map((collection, index) => (
				<LanguageInputContainer
					key={index}
					languages={languages}
					inputs={collection}
				/>
			))}
		</div>
	);
};

export default FormCollections;
