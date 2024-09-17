'use server';

import { queryParser } from '@/utils/analyses/queryParser';

// Laboratory Templates
export async function getLaboratoryTemplates(searchQuery) {
	let baseUrl = 'http://localhost:3000/api/laboratory/get-laboratory-templates';

	let query = queryParser(baseUrl, searchQuery);

	const res = await fetch(query);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get draft document from db. Reason: ' + res);
	}

	return res.json();
}

export async function getSingleTemplate(_id) {
	let baseUrl =
		'http://localhost:3000/api/laboratory/get-single-template/' + _id;

	const res = await fetch(baseUrl);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get draft template from db. Reason: ' + res);
	}

	return res.json();
}

// should rename this as createDraftDocument
export async function getDraftTemplate() {
	const res = await fetch(
		'http://localhost:3000/api/laboratory/draft-template'
	);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get draft template from db. Reason: ' + res);
	}

	return res.json();
}
// Laboratory Templates
/**
 *
 */
// Laboratody Documents
export async function getDraftDocument() {
	const res = await fetch(
		'http://localhost:3000/api/laboratory/draft-document'
	);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get draft document from db. Reason: ' + res);
	}

	return res.json();
}

export async function getLaboratoryDocuments(searchQuery) {
	let baseUrl = 'http://localhost:3000/api/laboratory/get-laboratory-documents';

	let query = queryParser(baseUrl, searchQuery);

	const res = await fetch(query);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get documents from db. Reason: ' + res);
	}

	return res.json();
}

export async function getDocumentById(_id) {
	const res = await fetch(
		`http://localhost:3000/api/laboratory/document-by-id/${_id}`
	);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get document from db. Reason: ' + res);
	}

	return res.json();
}

// Client
export async function getCustomers() {
	const res = await fetch('http://localhost:3000/api/customers/all');

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get clients from db. Reason: ' + res);
	}

	return res.json();
}

// export async function getAnalysisById(_id) {
// 	const res = await fetch(
// 		`http://localhost:3000/api/laboratory/analysis-by-id/${_id}`
// 	);

// 	if (!res.ok) {
// 		console.log(res);
// 		throw new Error('Failed to get document from db. Reason: ' + res);
// 	}

// 	return res.json();
// }
// Laboratody Documents
/**
 *
 */
// Calls to other collections
// export async function getSettings(searchQuery) {
// 	const baseUrl = 'http://localhost:3000/api/settings/get-settings';

// 	let query = queryParser(baseUrl, searchQuery);

// 	const res = await fetch(query);

// 	if (!res.ok) {
// 		console.log(res);
// 		throw new Error('Failed to get settings from db. Reason: ' + res);
// 	}

// 	return res.json();
// }
