'use client';

// state/actions
import { changeDocumentStatus } from '@/serverActions/laboratoryTemplates/changeDocumentStatus';

// componets
import SelectInput from '../inputs/SelectInput';
import ContextButton from '../buttons/ContextButton';

const status = [{ status: 'draft' }, { status: 'published' }];

const DocumentStatus = ({ template }) => {
	const handleClick = async (e) => {
		e.preventDefault();

		const element = e.target.form.elements.namedItem('documentStatus');

		let test = await changeDocumentStatus(element.value, template._id);
		console.log(test);
	};
	return (
		<fieldset name='document-status'>
			<h6>Status</h6>
			<div className='flex gap-2'>
				<SelectInput
					name='documentStatus'
					options={status}
					label='status'
					value='status'
					defaultValue={template.documentStatus}
				/>
				{/* <ContextButton label='Save' type='edit' onClick={handleClick} /> */}
			</div>
		</fieldset>
	);
};

export default DocumentStatus;
