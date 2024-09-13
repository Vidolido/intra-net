export function filterTemplates(templates = [], searchParams = {}) {
	const { documentType, origin, product, sampleType } = searchParams;

	// Validate mandatory `product` field
	// if (!product) {
	// 	throw new Error('Product is a mandatory search parameter.');
	// }

	return templates.filter((doc) => {
		if (doc.product !== product) return false;

		const isDocumentTypeMatch = documentType
			? doc.documentType === documentType
			: true;
		const isOriginMatch = origin ? doc.origin === origin : true;
		const isSampleTypeMatch = sampleType ? doc.sampleType === sampleType : true;

		return isDocumentTypeMatch && isOriginMatch && isSampleTypeMatch;
	});
}
