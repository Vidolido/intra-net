// components
import DateCollections from './DateCollections';
import Labels from './Labels';
import Unsorted from './Unsorted';

const DisplayDocuments = ({ templateSettings, sortByYear, documents }) => {
	return (
		<div className='flex-grow'>
			<div className='w-full'>
				{!sortByYear && (
					<Labels classes={'grid-cols-5'} dateTime={true} time={false} />
				)}
			</div>
			{sortByYear &&
				documents?.map(
					(documentOrCollection) =>
						documentOrCollection?.date && (
							<DateCollections
								key={documentOrCollection.date}
								collection={documentOrCollection}
								templateSettings={templateSettings}
							/>
						)
				)}
			{!sortByYear &&
				documents?.map(
					(document) =>
						document?._id && (
							<Unsorted
								key={document?._id}
								document={document}
								templateSettings={templateSettings}
							/>
						)
				)}
		</div>
	);
};

export default DisplayDocuments;
