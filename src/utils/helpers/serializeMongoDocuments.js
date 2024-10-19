import mongoose from 'mongoose';

export function serializeMongoDocuments(doc) {
	if (doc instanceof mongoose.Types.ObjectId) {
		return doc.toString();
	}

	if (Array.isArray(doc)) {
		return doc.map((item) => serializeMongoDocuments(item));
	}

	if (doc && typeof doc === 'object') {
		return Object.entries(doc).reduce((acc, [key, value]) => {
			acc[key] = serializeMongoDocuments(value);
			return acc;
		}, {});
	}

	return doc;
}
