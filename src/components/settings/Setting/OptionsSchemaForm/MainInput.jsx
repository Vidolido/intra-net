'use client';

// components
import LanguageInput from '@/components/reusable/LanguageInput';

const MainInput = ({ languages, error, state, setState }) => {
	const handleParameter = (data, dataObj) => {
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
			{/* <h5>Main parameter</h5> */}
			<div className='flex gap-2'>
				<div>
					<LanguageInput
						languages={languages}
						data={{
							state: state?.parameter?.name?.singular,
							inputName: 'singular',
							label: 'Singular Name',
						}}
						extractData={handleParameter}
					/>
					<span
						className={`bg-red-100 text-red-700 ${
							error?.singular ? 'visible' : 'hidden'
						}`}
						role='alert'>
						{error?.singular}
					</span>
				</div>
				<div>
					<LanguageInput
						languages={languages}
						data={{
							state: state?.parameter?.name?.plural,
							inputName: 'plural',
							label: 'Plural Name',
							fieldsetClass: 'flex',
						}}
						extractData={handleParameter}
					/>
					<span
						className={`bg-red-100 text-red-700 ${
							error?.plural ? 'visible' : 'hidden'
						}`}
						role='alert'>
						{error?.plural}
					</span>
				</div>
			</div>
		</fieldset>
	);
};

export default MainInput;
