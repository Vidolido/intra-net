// state/actions
import { orderByProduct } from '@/utils/orderByProduct';

// components
import Ordered from './Ordered';

const PublishedTemplates = ({ published, products, templateSettings }) => {
	const mutPublished = orderByProduct(published, products) || [];
	return (
		<div className='flex flex-col min-w-[40%] gap-1'>
			<h4>Templates</h4>
			{mutPublished.map((product) =>
				product.items.length > 0 ? (
					<Ordered
						key={product.id}
						product={product}
						products={products}
						templateSettings={templateSettings}
					/>
				) : null
			)}
		</div>
	);
};

export default PublishedTemplates;
