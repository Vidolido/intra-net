'use client';
import { useEffect } from 'react';

// state/actions
import { ADD_TO_COLLECTION } from '@/state/actionTypes';
import { useLaboratoryDispatchContext } from '@/state/laboratoryContext';
import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/inputs/SelectInput';

const Origin = ({ name, countries, setHeader, classes }) => {
	// let dispatch = useLaboratoryDispatchContext();

	let names = countries?.settings.map((setting) => ({
		_id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	useEffect(() => {
		setHeader((prev) => ({
			...prev,
			origin: names[0]._id,
		}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// useEffect(() => {
	// 	if (dispatch != undefined) {
	// 		dispatch({
	// 			type: ADD_TO_COLLECTION,
	// 			payload: {
	// 				state: 'header',
	// 				value: { origin: names[0].id },
	// 			},
	// 		});
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<fieldset name='countries-of-origin'>
			<h6>Origin</h6>
			<SelectInput
				name={name}
				options={names}
				value='id'
				defaultLanguage='en'
				onChange={(e) =>
					setHeader((prev) => ({
						...prev,
						origin: e.target.value,
					}))
				}
				classes={classes}
			/>
		</fieldset>
	);
};

export default Origin;
