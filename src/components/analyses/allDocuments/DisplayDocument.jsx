const DisplayDocument = ({
	document,
	products,
	types,
	countries,
	dateTime = false,
}) => {
	const product = products.find(
		(product) => product.id === document.header.product
	);
	const sampleType = types.find(
		(type) => type.id === document.header.sampleType
	);
	const documentType = types.find(
		(type) => type.id === document.header.documentType
	);
	const origin = countries.find(
		(country) => country.id === document.header.origin
	);
	const date = new Date(document.createdAt);
	return (
		<div className={`grid grid-cols-${dateTime ? 5 : 4} gap-4 border-b>`}>
			<p>{product.name['en']}</p>
			<p>{origin.name['en']}</p>
			<p>{sampleType?.name['en'] || 'none'}</p>
			<p>{documentType?.name['en']}</p>
			{dateTime && (
				<p>{`${date.toLocaleDateString('mk-MK')} ${date.toLocaleTimeString(
					'en-GB'
				)}`}</p>
			)}
		</div>
	);
};

export default DisplayDocument;
