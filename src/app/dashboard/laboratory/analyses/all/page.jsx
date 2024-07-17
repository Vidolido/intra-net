// state/actions
import { getLaboratoryDocuments } from '../../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';

// components
import Labels from '@/components/analyses/allDocuments/Labels';
import Unsorted from '@/components/analyses/allDocuments/Unsorted';
import DateCollections from '@/components/analyses/allDocuments/DateCollections';

const page = async () => {
	const { templateSettings } = await getTemplateSettings();

	const { documents } = await getLaboratoryDocuments({
		documentStatus: 'published',
		sorted: true,
	});

	const { documents: notSorted } = await getLaboratoryDocuments({
		documentStatus: 'published',
		// sorted: true,
	});
	// console.log(notSorted, 'not');
	return (
		<div className='w-10/12'>
			All Documents
			<div className='w-full'>
				<Labels dateTime={true} />
				{notSorted.map((document) => (
					<Unsorted
						key={document._id}
						document={document}
						templateSettings={templateSettings}
					/>
				))}
			</div>
			{documents.map((dateCollection) => (
				<DateCollections
					key={dateCollection.date}
					collection={dateCollection}
					templateSettings={templateSettings}
				/>
			))}
		</div>
	);
};

export default page;
