// components
import ContextButton from '@/components/buttons/ContextButton';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';

const CollectionItem = ({ languages, inputs, defaultLanguage, onClick }) => {
	return (
		<div className='flex gap-2'>
			<LanguageInputContainer
				languages={languages}
				inputs={inputs}
				defaultLanguage={defaultLanguage}
			/>
			<ContextButton label='Remove' type='edit' onClick={onClick} />
		</div>
	);
};

export default CollectionItem;
