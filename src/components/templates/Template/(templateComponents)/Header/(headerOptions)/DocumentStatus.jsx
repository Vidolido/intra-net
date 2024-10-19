'use client';

// state/actions
import { changeDocumentStatus } from '@/serverActions/laboratoryTemplates/changeDocumentStatus';

// componets
import SelectInput from '@/components/reusable/SelectInput';

const status = [
	{
		name: {
			en: 'draft',
			mk: 'драфт',
			gr: 'гр',
		},
	},
	{
		name: {
			en: 'published',
			mk: 'објавен',
			gr: 'гр',
		},
	},
];

const DocumentStatus = ({ template, languages, defaultValue }) => {
	return (
		<fieldset name='document-status'>
			<h6>Status</h6>
			<div className='flex gap-2'>
				<SelectInput
					defaultLanguage={languages[0].language}
					data={{
						state: status,
						selectName: 'documentStatus',
						defaultValue: defaultValue?.documentStatus,
						classes: 'flex flex-col items-start bg-white px-[2px] w-full',
					}}
					// extractData={handleSelection}
					// resetComponentData={resetComponentData}
					// setResetComponentData={setResetComponentData}
				/>
			</div>
		</fieldset>
	);
};

export default DocumentStatus;
