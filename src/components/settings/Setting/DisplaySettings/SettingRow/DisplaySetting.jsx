import { formatKeyValue } from '@/utils/settings/formatKeyValue';

const DisplaySetting = ({
	defaultLanguage,
	property,
	collections,
	option = null,
}) => {
	return (
		<>
			<div className='border-r px-3'>
				<p>{property[defaultLanguage] || 'Parameter name'}</p>
			</div>
			{Object.entries(collections).map(([_id, collection]) => (
				<div key={_id} className='border-r px-3'>
					{collection.map((item, i) => {
						if (option && !option.options.expand && i > 0) return;

						return (
							<p key={item._id}>
								{(typeof item.value === 'string' && item.value) ||
									item.value[defaultLanguage] ||
									formatKeyValue(item?.value?.key, item?.value?.value)}
							</p>
						);
					})}
				</div>
			))}
		</>
	);
};

export default DisplaySetting;
