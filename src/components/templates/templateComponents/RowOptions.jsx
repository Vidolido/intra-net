'use client';

import Options from '@/components/options/Options';
import { deleteTemplateRow } from '@/serverActions/laboratoryTemplates/deleteTemplateRow';

const RowOptions = ({ templateId, rowId }) => {
	const handleDelete = async () => {
		await deleteTemplateRow(rowId, templateId);
	};
	return (
		<Options
			_id={templateId}
			edit={{
				show: true,
				link: '/dashboard/laboratory/templates/edit/',
				classes: 'hover:underline text-black',
			}}
			deleteItem={{
				show: true,
				type: 'default',
				classes: 'self-end',
				onClick: handleDelete,
			}}
		/>
	);
};

export default RowOptions;
