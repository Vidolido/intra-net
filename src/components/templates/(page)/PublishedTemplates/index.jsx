// state/actions
import { orderByProduct } from '@/utils/templates/orderByProduct';

// components
import Ordered from './Ordered';

const PublishedTemplates = ({ published, data }) => {
  const mutPublished = orderByProduct(published, data?.products.settings) || [];
  return (
    <div className='flex flex-col min-w-[40%] gap-1'>
      <h4>Templates</h4>
      {mutPublished.map(
        (product) =>
          product.items.length > 0 && (
            <Ordered key={product.id} product={product} data={data} />
          )
      )}
    </div>
  );
};

export default PublishedTemplates;
