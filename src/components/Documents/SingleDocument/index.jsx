'use client';

import Certificate from './Certificate';
import OtherDocuments from './OtherDocuments';
import TestReport from './TestReport';

const documentType = () => {};

const SingleDocument = ({
	document,
	documentTypes,
	products,
	laboratorySettings,
	languages,
}) => {
	// switch(type) {
	//   case 'A':
	//     return <DocumentA />
	//     case 'B':
	//       return <DocumentB />
	//       default:
	//         return <div>Invalid document type</div>

	// }
	// console.log(laboratorySettings, 'the laboratorySettings');

	let isTestReport =
		documentTypes.find((type) => type._id === document.header.documentType)
			.parameter.inputValue['en'] === 'Test Report';

	let isCertificate =
		documentTypes.find((type) => type._id === document.header.documentType)
			.parameter.inputValue['en'] === 'Certificate';

	// console.log(isTestReport, 'isTestReport');
	if (isTestReport)
		return (
			<TestReport
				document={document}
				products={products}
				laboratorySettings={laboratorySettings}
				languages={languages}
			/>
		);

	if (isCertificate)
		return (
			<Certificate
				document={document}
				products={products}
				laboratorySettings={laboratorySettings}
				languages={languages}
			/>
		);

	if (!isTestReport && !isCertificate)
		return (
			<OtherDocuments
				document={document}
				products={products}
				laboratorySettings={laboratorySettings}
				languages={languages}
			/>
		);

	return <h4>Empty document</h4>;
};

export default SingleDocument;
