'use client';
import { useState } from 'react';

// components
import SingleField from './SingleField';
import ShowHideButton from '@/components/reusable/ShowHideButton';

// function findHighestOrder(arr) {
// 	return arr.reduce((max, obj) => {
// 		return obj.order !== undefined && obj.order > max ? obj.order : max;
// 	}, 0);
// }

const CheckBoxFields = ({ documentMeta, handleCheck }) => {
	const [visible, setVisible] = useState(false);
	const handleHide = () => {
		setVisible(!visible);
	};

	const onCheck = (e) => {
		let { value } = e.target;

		let changeCheckedStatus = documentMeta.map((field) =>
			field._id.toString() === value
				? { ...field, checked: !field.checked }
				: field
		);
		handleCheck(changeCheckedStatus);
	};
	return (
		<fieldset className='bg-white border border-slate-200 pl-1 rounded'>
			<ShowHideButton heading='Fields' visible={visible} onClick={handleHide} />
			<fieldset
				className={`grid grid-cols-2 ${!visible ? 'hidden' : 'visible'}`}>
				{documentMeta.length > 0
					? documentMeta.map((field) => (
							<SingleField key={field?._id} field={field} onChange={onCheck} />
					  ))
					: null}
			</fieldset>
		</fieldset>
	);
};

export default CheckBoxFields;
