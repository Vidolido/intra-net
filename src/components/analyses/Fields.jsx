'use client';
import { useEffect } from 'react';

// functions
import { isObjectEmpty } from '@/utils/functions';
import { mutateFields } from '@/utils/mutateFields';

// state/actions
import {
	useLaboratoryContext,
	useLaboratoryDispatchContext,
} from '@/state/laboratoryContext';
import { ADD } from '@/state/actionTypes';

// components
import SingleField from './SingleField';

const Fields = ({ languages, fields: dbFields }) => {
	const dispatch = useLaboratoryDispatchContext();
	const { fields } = useLaboratoryContext();
	const mutFields = mutateFields(dbFields);

	useEffect(() => {
		dispatch({
			type: ADD,
			payload: {
				state: 'fields',
				value: mutFields,
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<fieldset>
			<h3>Fields</h3>
			{/* {!isObjectEmpty(fields) */}
			{fields.length > 0
				? fields.map((field) => <SingleField key={field._id} field={field} />)
				: ''}
		</fieldset>
	);
};

export default Fields;
