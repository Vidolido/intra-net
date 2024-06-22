import EditCollections from './EditCollections';
import EditMain from './EditMain';

const EditSetingForm = ({ languages, setting: dbSetting }) => {
	let setting = { ...dbSetting };
	let parameter = setting.parameter;
	let collections = setting.collections;
	// console.log(parameter.name.singular['en']);
	return (
		<form className='flex'>
			<EditMain parameter={parameter} languages={languages} />
			<EditCollections collections={collections} />
		</form>
	);
};

export default EditSetingForm;
