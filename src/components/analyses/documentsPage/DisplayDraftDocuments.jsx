// components
import DraftDocument from './DraftDocument';

const DisplayDraftDocuments = ({ documents }) => {
	return (
		<div className='flex flex-col gap-1'>
			<h3>Draft Documents</h3>
			{!documents
				? 'There are no draft versions.'
				: documents?.map((doc) => {
						return <DraftDocument key={doc._id} document={doc} />;
				  })}
		</div>
	);
};

export default DisplayDraftDocuments;
