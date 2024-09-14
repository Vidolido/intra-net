'use server';

// connection/models/db functions
import dbConnect from '@/db/conn';
import Document from '@/db/models/Document';

const buildQuery = (products, origin, sampleTypes, documentTypes) => {
	const query = { documentStatus: 'published' };

	if (products.length > 0) {
		query['header.product'] = { $in: products };
	}

	if (origin.length > 0) {
		query['header.origin'] = { $in: origin };
	}

	if (sampleTypes.length > 0) {
		query['header.sampleType'] = {
			$in: sampleTypes,
		};
	}

	if (documentTypes.length > 0) {
		query['header.documentType'] = {
			$in: documentTypes,
		};
	}

	return query;
};

export async function filterDocuments(filter) {
	const { products, sampleTypes, documentTypes, origin } = filter;
	try {
		await dbConnect();

		const query = buildQuery(products, origin, sampleTypes, documentTypes);
		const matchingDocuments = await Document.find(query).exec();
		// console.log(matchingDocuments, 'OVIE DOKUMENTI');
		// return JSON.stringify(matchingDocuments);
		return {
			documents: JSON.stringify(matchingDocuments),
		};
	} catch (error) {
		console.log('Failed to find documents in database. error:', error);
		throw Error('Could not find documents in database: ' + error);
	}
}
