// state/actions
import { getLaboratoryDocuments } from '../../apiCalls';

// components
import DateCollections from '@/components/analyses/allDocuments/DateCollections';

const page = async () => {
	const { documents } = await getLaboratoryDocuments({
		documentStatus: 'published',
		sorted: true,
	});

	return (
		<div>
			All Documents
			{documents.map((dateCollection) => (
				<DateCollections
					key={dateCollection.date}
					collection={dateCollection}
				/>
			))}
		</div>
	);
};

export default page;
