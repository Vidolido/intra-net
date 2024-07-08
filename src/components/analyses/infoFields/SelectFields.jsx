'use client';
import { useState } from 'react';
// state/actions
import { mutateFields } from '@/utils/mutateFields';

// components
import ArrowSvg from '@/../public/arrow.svg';
import SingleField from '../SingleField';

const SelectFields = ({ fields }) => {
	const [visible, setVisible] = useState(false);

	const mutFields = mutateFields(fields);

	const handleHide = () => {
		setVisible(!visible);
	};
	return (
		<form>
			{' '}
			<fieldset className='bg-white border border-slate-200 pl-1 rounded mt-2'>
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
					{mutFields.length > 0
						? mutFields.map((field) => (
								<SingleField key={field._id} field={field} />
						  ))
						: ''}
				</fieldset>
			</fieldset>
		</form>
	);
};

export default SelectFields;
