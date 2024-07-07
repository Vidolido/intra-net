// state/actions
import { orderByProduct } from '@/utils/orderByProduct';

// components
import Ordered from './Ordered';

const PublishedTemplates = ({ published, products, templateSettings }) => {
	const mutPublished = orderByProduct(published, products) || [];
	return (
		<div className='flex flex-col gap-1'>
			<h2>Templates</h2>
			{mutPublished.map((product) =>
				product.items.length > 0 ? (
					<Ordered
						key={product._id}
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
