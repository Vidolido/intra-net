import SelectInput from '@/components/inputs/SelectInput';

const EditCollections = ({ collections }) => {
	console.log(collections, 'collections');
	return (
		<div>
			<fieldset className='flex flex-col min-w-[200px]'>
				<label>Collection</label>

				<SelectInput
					name='collection-select'
					options={collections}
					defaultLanguage='en'
				/>
			</fieldset>
		</div>
	);
};

export default EditCollections;
