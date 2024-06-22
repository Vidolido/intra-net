import EditMain from './EditMain';

const EditSetingForm = ({ languages, setting: dbSetting }) => {
	let setting = { ...dbSetting };
	let parameter = setting.parameter;
	let collections = setting.collections;
	// console.log(parameter.name.singular['en']);
	return (
		<form>
			<EditMain parameter={parameter} languages={languages} />
		</form>
	);
};

export default EditSetingForm;
