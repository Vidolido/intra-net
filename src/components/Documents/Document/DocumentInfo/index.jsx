'use client';

import DocumentType from './DocumentType';

const DocumentInfo = ({ languages, settings }) => {
	// console.log(settings, 'these settings');
	return (
		<div>
			<div>Client</div>
			<DocumentType languages={languages} types={settings?.documentTypes} />
		</div>
	);
};

export default DocumentInfo;
