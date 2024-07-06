'use client';

import ContextButton from '@/components/buttons/ContextButton';
import { deleteTemplateRow } from '@/serverActions/laboratoryTemplates/deleteTemplateRow';

const RowOptions = ({ templateId, rowId }) => {
	const handleDelete = async () => {
		await deleteTemplateRow(rowId, templateId);
	};
	return <ContextButton label='delete' type='default' onClick={handleDelete} />;
};

export default RowOptions;
