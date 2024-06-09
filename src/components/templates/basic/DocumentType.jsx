import SelectInput from '@/components/inputs/SelectInput';
import { documentTypes } from './documentTypes';

const DocumentType = () => {
	const types = documentTypes;
	return (
		<fieldset>
			<h6>DocumentType</h6>
			<SelectInput options={types} defaultLanguage='en' />
		</fieldset>
	);
};

export default DocumentType;
