'use client';

import { useLaboratoryContext } from '@/state/laboratoryContext';
import { isObjectEmpty } from '@/utils/functions';
import SingleInputField from './SingleInputField';

const BasicInputFields = () => {
	const { fields } = useLaboratoryContext();

	// console.log(fields);
	return (
		<div>
			BasicInputFields
			{fields.length > 0
				? fields.map((field) =>
						field.checked !== 'false' ? (
							<SingleInputField key={field._id} field={field} />
						) : (
							''
						)
				  )
				: ''}
		</div>
	);
};

export default BasicInputFields;
