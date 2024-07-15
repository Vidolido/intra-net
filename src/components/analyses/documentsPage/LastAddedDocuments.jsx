// state/actions
import { orderDocumentsByProduct } from '@/utils/analyses/orderDocumentsByProduct';

// components
import Ordered from './Ordered';

const LastAddedDocuments = ({ documents, templateSettings, products }) => {
  const mutDocuments = orderDocumentsByProduct(documents, products);
  //   console.log(mutDocuments, 'the mutDocuments');
  return (
    <div className='flex flex-col gap-1'>
      <h3>Last added documents</h3>
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
