'use client';

// state/actions
import { useSettingsContext } from '@/state/settingsContext';

// components
import LanguageInputContainer from '../inputs/LanguageInputContainer';
import ContextButton from '../buttons/ContextButton';

const AddCollections = ({ languages }) => {
	const { state, setState } = useSettingsContext();

	const handleClick = (e) => {
		const length = state.collections.length;

		const collectionElements = Array.from(e.target.form.elements).filter(
			(element) => element.name.includes('collection')
		);

		const collectionNames = collectionElements?.map((element) => {
			let nameArray = element.name.split('-').splice(1);
			return {
				[length + '-' + nameArray.join('-')]: element.value,
			};
		});

		setState((prevState) => ({
			...prevState,
			collections: [...prevState.collections, collectionNames],
		}));
	};

	return (
		<div>
			<LanguageInputContainer
				label='Collection'
				languages={languages}
				name='collection'
			/>
			<ContextButton label='Add' onClick={handleClick} />
		</div>
	);
};

export default AddCollections;
