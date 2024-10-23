'use client';

import ErrorMsg from '@/components/reusable/ErrorMsg';
// components
import LanguageInput from '@/components/reusable/LanguageInput';

const MainInput = ({
	languages,
	error,
	state,
	setState,
	reset,
	// resetLanguage,
	// setResetLanguage,
	// resetType,
}) => {
	const handleParameter = (data, dataObj) => {
		console.log(data, dataObj, 'ovie dve');
		setState((prev) => ({
			...prev,
			parameter: {
				name: {
					...prev.parameter.name,
					[dataObj?.name]: data,
				},
			},
		}));
	};

	return (
		<fieldset
			name='option-schema-main'
			className='border border-slate-300 rounded p-1'>
			<div className='flex gap-2'>
				<div>
					<LanguageInput
						languages={languages}
						data={{
							defaultLanguage: languages[0].language,
							state: state?.parameter?.name?.singular,
							inputName: 'singular',
							label: 'Singular Name',
						}}
						extractData={handleParameter}
						reset={reset}
					/>
					{error?.singular && <ErrorMsg msg={error?.singular} />}
				</div>
				<div>
					<LanguageInput
						languages={languages}
						data={{
							defaultLanguage: languages[0].language,

							state: state?.parameter?.name?.plural,
							inputName: 'plural',
							label: 'Plural Name',
							fieldsetClass: 'flex',
						}}
						extractData={handleParameter}
						reset={reset}
					/>
					{error?.plural && <ErrorMsg msg={error?.plural} />}
				</div>
			</div>
		</fieldset>
	);
};

export default MainInput;
