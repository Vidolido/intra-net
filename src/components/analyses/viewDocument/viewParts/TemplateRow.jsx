const TemplateRow = ({ item, templateId }) => {
	return (
		<div className='grid grid-cols-[25px_25%_1fr_1fr_1fr_1fr_25px] border border-t-0 border-slate-500'>
			<div className='border-r border-slate-500 flex justify-center items-center'>
				{/* <DragSvg className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer' /> */}
				<input type='checkbox' checked='checked' className='checkbox' />
			</div>
			<p className='border-r border-slate-500 pl-2'>
				{item.parameter.propertyValue['en']}
			</p>
			{Object.entries(item.items).map((collection) => {
				console.log(collection, 'the collection');
				return (
					<div
						key={collection[0]}
						className='border-r border-slate-500 flex justify-center items-center'>
						{collection[1] &&
							collection[1].map((collectionItem, i) => {
								return (
									<p key={collectionItem.id}>
										{' '}
										{(typeof collectionItem.value === 'string' &&
											collectionItem.value) ||
											collectionItem.value['en'] ||
											`${collectionItem?.value?.key} - ${collectionItem?.value?.value}`}
									</p>
								);
							})}
					</div>
				);
			})}
			<p className='border-r border-slate-500 flex justify-center items-center'>
				<span>{item.result}</span>
			</p>

			<div>{/* <RowOptions templateId={templateId} rowId={item._id} /> */}</div>
		</div>
	);
};

export default TemplateRow;
