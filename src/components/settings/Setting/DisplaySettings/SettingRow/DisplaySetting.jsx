import React, { useState } from 'react';

const DisplaySetting = ({ defaultLanguage, property, collections }) => {
	// const [options, setOptions] = useState({
	// 	edit: false,
	// 	expand: false,
	// });
	return (
		<>
			<div className='border-r px-3'>
				<p>{property[defaultLanguage]}</p>
			</div>
			{collections.map((collection) => (
				<div key={collection._id} className='border-r px-3'>
					{collection?.items.map((item, i) => {
						return (
							<p key={item._id}>
								{' '}
								{(typeof item.value === 'string' && item.value) ||
									item.value[defaultLanguage] ||
									`${item?.value?.key} - ${item?.value?.value}`}
							</p>
						);
					})}
				</div>
			))}
		</>
	);
};

export default DisplaySetting;
