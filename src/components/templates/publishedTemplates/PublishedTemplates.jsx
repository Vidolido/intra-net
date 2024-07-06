// import PublishedSetting from './PublishedSetting';

import { orderByProduct } from '@/utils/orderByProduct';
import PublishedTemplate from './PublishedTemplate';

const PublishedTemplates = ({ published, products }) => {
	// console.log(published, 'pub');
	// let orderByProduct = () => {

	// }
	return (
		<div className='flex flex-col gap-1'>
			<h2>Settings</h2>
			{!published
				? 'There are no published settings.'
				: published?.map((setting) => {
						return (
							<PublishedTemplate
								key={setting._id}
								setting={setting}
								products={products}
							/>
						);
				  })}
		</div>
	);
};

export default PublishedTemplates;
