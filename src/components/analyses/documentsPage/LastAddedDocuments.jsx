// state/actions
import { orderDocumentsByProduct } from '@/utils/analyses/orderDocumentsByProduct';

// components
import Ordered from './Ordered';

const LastAddedDocuments = ({ documents, templateSettings, products }) => {
  let now = new Date().toISOString().split('T')[0];
  let todaysDocuments = documents.find((document) => document.date === now);
  //   console.log(now, 'TIME IS NOW');
  console.log(todaysDocuments, 'todaysDocuments');
  const mutDocuments = !todaysDocuments
    ? []
    : orderDocumentsByProduct(todaysDocuments.documents, products);

  //   const options = {
  //     timeZone: 'Europe/Skopje',
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour12: false,
  //   };
  //   // I should change locale according default language
  //   const formatter = new Intl.DateTimeFormat('mk-MK', options); // en-GB for English in British format
  //   const formattedTime = formatter.format(new Date());
  console.log(mutDocuments, 'the mutDocuments');
  console.log(mutDocuments.length, 'the length');
  return (
    <div className='flex flex-col gap-1 mt-2'>
      {!mutDocuments.length && <h4>No documents added in last 24 hours</h4>}
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
