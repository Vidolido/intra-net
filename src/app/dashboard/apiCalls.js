'use server';

// languages
export async function getLanguages() {
	const res = await fetch('http://localhost:3000/api/languages');

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get languages from db. Reason: ' + res);
	}

	return res.json();
}

// draft settings
export async function getDraftSettings() {
	const res = await fetch(
		'http://localhost:3000/api/settings/get-all-draft-settings'
	);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get draft settings from db. Reason: ' + res);
	}

	return res.json();
}

export async function getDraftSetting() {
	const res = await fetch('http://localhost:3000/api/settings/draft-setting', {
		next: { tags: ['draft'] },
		cache: 'no-store',
	});

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get vehicles from db. Reason: ' + res);
	}

	return res.json();
}

export async function getDraftById(_id) {
	const res = await fetch(
		`http://localhost:3000/api/settings/edit-draft/${_id}`
	);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get draft setting from db. Reason: ' + res);
	}

	return res.json();
}
// draft settings

// labodatory templates
export async function getLaboratorySettings() {
	const res = await fetch(
		'http://localhost:3000/api/laboratory/template-setting'
	);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get settings from db. Reason: ' + res);
	}

	return res.json();
}

export async function getLaboratoryDraftTemplates() {
	const res = await fetch(
		'http://localhost:3000/api/laboratory/all-draft-templates'
	);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get draft templates from db. Reason: ' + res);
	}

	return res.json();
}

export async function getLaboratoryDraftById(_id) {
	const res = await fetch(
		`http://localhost:3000/api/laboratory/edit-draft/${_id}`
	);

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get draft template from db. Reason: ' + res);
	}

	return res.json();
}
// labodatory templates
