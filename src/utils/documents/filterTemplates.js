export function filterTemplates(templates = [], searchParams = {}) {
	const { documentType, origin, product, sampleType } = searchParams;

	return templates.filter((template) => {
		if (template?.header?.product !== product) return false;

		const isDocumentTypeMatch = documentType
			? template?.header?.documentType === documentType
			: true;
		const isOriginMatch = origin ? template?.header?.origin === origin : true;
		const isSampleTypeMatch = sampleType
			? template?.header?.sampleType === sampleType
			: true;

		return isDocumentTypeMatch && isOriginMatch && isSampleTypeMatch;
	});
}
