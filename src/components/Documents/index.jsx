// components
import CreateDraftDocuments from './(page)/CreateDraftDocument';
import LastAddedDocuments from './(page)/LastAddedDocuments';
import DisplayDraftDocuments from './(page)/DisplayDraftDocuments';

const Documents = ({
	templateSettings,
	draftDocuments,
	publishedDocuments,
	products,
}) => {
	return (
		<div className='w-full pr-4'>
			<CreateDraftDocuments />
			<h2>Documents</h2>
			<div className='flex justify-between w-full'>
				<LastAddedDocuments
					documents={publishedDocuments}
					templateSettings={templateSettings}
					products={products}
				/>
				<DisplayDraftDocuments documents={draftDocuments} />
			</div>
		</div>
	);
};

export default Documents;
