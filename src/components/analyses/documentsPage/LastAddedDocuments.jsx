// components

const LastAddedDocuments = ({ documents }) => {
	console.log(documents, 'the documents');
	return (
		<div className='flex flex-col gap-1'>
			<h3>Last added documents</h3>
			{!documents
				? 'There are no draft versions.'
				: documents?.map((doc) => {
						{
							/* return <SingleDocument key={doc._id} document={doc} />; */
						}
				  })}
		</div>
	);
};

export default LastAddedDocuments;
