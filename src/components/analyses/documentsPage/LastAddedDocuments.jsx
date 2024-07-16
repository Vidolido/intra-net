// state/actions
import { orderDocumentsByProduct } from '@/utils/analyses/orderDocumentsByProduct';

// components
import Ordered from './Ordered';

const LastAddedDocuments = ({ documents, templateSettings, products }) => {
	const mutDocuments = orderDocumentsByProduct(documents, products);

	const options = {
		timeZone: 'Europe/Skopje',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour12: false,
	};
	// I should change locale according default language
	const formatter = new Intl.DateTimeFormat('mk-MK', options); // en-GB for English in British format
	const formattedTime = formatter.format(new Date());

	return (
		<div className='flex flex-col gap-1 mt-2'>
			<h4>{formattedTime}</h4>
			{mutDocuments.map((document) =>
				document.items.length > 0 ? (
					<Ordered
						key={document.id}
						document={document}
						templateSettings={templateSettings}
					/>
				) : null
			)}
		</div>
	);
};

export default LastAddedDocuments;
