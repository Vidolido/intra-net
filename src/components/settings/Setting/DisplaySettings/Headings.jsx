const Headings = ({
	defaultLanguage,
	headings,
	classes,
	gridTemplateColumns,
}) => {
	return (
		<div className={classes} style={{ gridTemplateColumns }}>
			<p className='border-r'></p>
			<p className='border-r px-3'>{headings?.parameter[defaultLanguage]}</p>

			{headings &&
				headings?.collections &&
				headings?.collections?.map((collection, index) => (
					<p key={index} className='border-r px-3'>
						{collection[defaultLanguage]}
					</p>
				))}
			<p></p>
		</div>
	);
};

export default Headings;
