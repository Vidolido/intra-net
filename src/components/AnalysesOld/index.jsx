// components
import CreateDraftAnalysis from './(page)/CreateDraftAnalyses';
import LastAddedDocuments from './(page)/LastAddedDocuments';
import DisplayDraftDocuments from './(page)/DisplayDraftDocuments';

const Analysis = ({
	templateSettings,
	draftDocuments,
	publishedDocuments,
	products,
}) => {
	return (
		<div className='w-full pr-4'>
			<CreateDraftAnalysis />
			<h2>Analyses</h2>
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

export default Analysis;
