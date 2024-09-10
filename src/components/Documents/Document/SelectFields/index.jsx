'use client';
import { useState } from 'react';

// state/actions
import { saveFields } from '@/serverActions/laboratoryAnalyses/saveFields';
import { mutateFields } from '@/utils/mutateFields';

// components
import ArrowSvg from '@/../public/arrow.svg';
import ContextButton from '@/components/buttons/ContextButton';
import SingleField from './SingleField';
import InputFields from './InputFIelds';

const SelectFields = ({ fields: dbFields, document }) => {
	// const mutFields = mutateFields(dbFields);
	const [visible, setVisible] = useState(false);
	// const [fields, setFields] = useState(mutFields);
	const [fields, setFields] = useState(dbFields);
	// console.log(fields, 'THE  FIELDS');
	const handleHide = () => {
		setVisible(!visible);
	};

	const handleChecked = (e) => {
		const newFields = fields.map((field) => {
			if (field._id === e.target.value) {
				field.checked === 'false'
					? (field.checked = 'checked')
					: (field.checked = 'false');
			}
			return field;
		});
		setFields(newFields);
	};

	const handleClick = async (e) => {
		// e.target.form.preventDefault();

		let inputFields = e.target.form.elements
			.namedItem('document-fields')
			.querySelectorAll('input');

		let newFields = Array.from(inputFields).reduce((acc, currentValue) => {
			let field = fields.find((field) => field._id === currentValue.name);
			field.value = currentValue.value;
			if (acc.find((e) => e._id === currentValue.name)) {
				acc.find((e) => e._id === currentValue.name).value = currentValue.value;
			} else {
				acc.push(field);
			}
			return acc;
		}, []);

		// HANDLE ERRORS HERE
		await saveFields(newFields, document._id);
	};

	// const submit = saveFields.bind(null, document._id);
	return (
		<form className='bg-slate-100 border border-t-0 border-slate-200 rounded'>
			<fieldset className='bg-white border border-slate-200 pl-1 rounded'>
				<button type='button' onClick={handleHide} className='relative w-full'>
					<h3 className='text-left'>Fields</h3>
					<ArrowSvg
						className={`w-[22px] h-[22px] absolute right-1 top-[3px] fill-red-500 hover:fill-red-300 ${
							visible ? '' : 'rotate-180'
						}`}
					/>
				</button>
				<fieldset
					className={`grid grid-cols-2 ${!visible ? 'hidden' : 'visible'}`}>
					{fields.length > 0
						? fields.map((field) => (
								<SingleField
									key={field._id}
									field={field}
									onChange={handleChecked}
								/>
						  ))
						: null}
				</fieldset>
			</fieldset>
			<InputFields
				fields={document.fields.length > 0 ? document.fields : fields}
			/>
			<div className='p-1'>
				<ContextButton
					label='Save'
					type='edit'
					onClick={handleClick}
					classes='w-full'
				/>
			</div>
		</form>
	);
};

export default SelectFields;
// onClick={() => saveFields(fields, analysisId)}
