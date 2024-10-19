// state/actions
import { orderByProduct } from '@/utils/orderByProduct';

// components
import Ordered from './Ordered';

const PublishedTemplates = ({ published, settings }) => {
	const mutPublished = orderByProduct(published, settings?.products) || [];
	console.log(mutPublished);
	return (
		<div className='flex flex-col min-w-[40%] gap-1'>
			<h4>Templates</h4>
			{/* {mutPublished.map((product) =>
				product.items.length > 0 ? (
					<Ordered key={product.id} product={product} settings={settings} />
				) : null
			)} */}
		</div>
	);
};

export default PublishedTemplates;
