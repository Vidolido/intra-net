// components
import DateCollections from '../allDocuments/DateCollections';

const LastAddedDocuments = ({ documents, templateSettings, products }) => {
	let today = new Date().toISOString().split('T')[0];

	console.log(today);
	console.log(documents.find((collection) => collection.date === today));
	let todaysDocuments = documents.find(
		(collection) => collection.date === today
	);

	return (
		<div className='flex flex-col gap-1 mt-2 w-2/3'>
			{!todaysDocuments.documents.length && (
				<h4>No documents added in last 24 hours</h4>
			)}
			<DateCollections
				collection={todaysDocuments}
				templateSettings={templateSettings}
			/>
		</div>
	);
};

export default LastAddedDocuments;
