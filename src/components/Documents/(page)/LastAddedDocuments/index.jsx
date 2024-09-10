// components
import DateCollections from '../../allDocuments/DateCollections';

const LastAddedDocuments = ({ documents = [], templateSettings }) => {
	let today = new Date().toISOString().split('T')[0];

	let todaysDocuments = documents.find(
		(collection) => collection.date === today
	);

	return (
		<div className='flex flex-col gap-1 mt-2 w-2/3'>
			{!todaysDocuments?.documents && (
				<h4>No documents added in last 24 hours</h4>
			)}
			{todaysDocuments?.documents && (
				<DateCollections
					collection={todaysDocuments}
					templateSettings={templateSettings}
				/>
			)}
		</div>
	);
};

export default LastAddedDocuments;
