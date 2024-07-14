// state/actions
import { getLaboratoryDocuments } from '../apiCalls';

// components
import CreateDraftAnalysis from '@/components/analyses/CreateDraftAnalyses';
import DisplayDraftDocuments from '@/components/analyses/documentsPage/DisplayDraftDocuments';
import LastAddedDocuments from '@/components/analyses/documentsPage/LastAddedDocuments';

const page = async () => {
	let { documents: draftDocuments } = await getLaboratoryDocuments('draft');
	let { documents: publishedDocuments } = await getLaboratoryDocuments(
		'published'
	); // тука да ги земам документите кои се од последните 24 часа, за да не ги зема сите документи од база.
	return (
		<div className='w-full pr-4'>
			<h2>Analyses</h2>
			<CreateDraftAnalysis />
			<div className='flex justify-between w-full'>
				<LastAddedDocuments documents={publishedDocuments} />
				<DisplayDraftDocuments documents={draftDocuments} />
			</div>
		</div>
	);
};

export default page;
