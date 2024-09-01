'use client';
import { useEffect } from 'react';

// state/actions
import { nameArray } from '@/utils/nameArray';

// components
import SelectInput from '@/components/inputs/SelectInput';

const Origin = ({ name, countries, languages, value, setHeader, classes }) => {
	// console.log(countries, 'countries');

	useEffect(() => {
		if (setHeader) {
			setHeader((prev) => ({
				...prev,
				origin: countries[0]._id,
			}));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<fieldset name='countries-of-origin'>
			<h6>Origin</h6>
			<SelectInput
				name={name}
				options={countries}
				value='_id'
				defaultValue={value}
				onChange={(e) =>
					setHeader
						? setHeader((prev) => ({
								...prev,
								origin: e.target.value,
						  }))
						: null
				}
				defaultLanguage={languages[0]?.language}
				classes={classes}
			/>
		</fieldset>
	);
};

export default Origin;
