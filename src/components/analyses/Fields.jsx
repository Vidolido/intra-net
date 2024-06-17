import { mutateFields } from '@/utils/functions';
import SingleField from './SingleField';

const Fields = ({ languages, fields }) => {
	// console.log(fields, 'fields');
	const mutFields = mutateFields(fields);
	return (
		<fieldset>
			<h3>Fields</h3>
			{mutFields.map((field) => (
				<SingleField key={field._id} field={field} />
			))}
		</fieldset>
	);
};

export default Fields;
