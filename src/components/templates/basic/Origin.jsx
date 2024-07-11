'use client';
import { useEffect } from 'react';

// state/actions
import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/inputs/SelectInput';

const Origin = ({ name, countries, setHeader, classes }) => {
	let names = countries?.settings.map((setting) => ({
		_id: setting._id,
		...nameArray(setting.parameter.inputValue),
	}));

	useEffect(() => {
		if (setHeader) {
			setHeader((prev) => ({
				...prev,
				origin: names[0]._id,
			}));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<fieldset name='countries-of-origin'>
			<h6>Origin</h6>
			<SelectInput
				name={name}
				options={names}
				value='id'
				defaultLanguage='en'
				onChange={(e) =>
					setHeader
						? setHeader((prev) => ({
								...prev,
								origin: e.target.value,
						  }))
						: null
				}
				classes={classes}
			/>
		</fieldset>
	);
};

export default Origin;
