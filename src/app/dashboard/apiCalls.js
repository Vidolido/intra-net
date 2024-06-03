'use server';

export async function getLanguages() {
	const res = await fetch('http://localhost:3000/api/languages');

	if (!res.ok) {
		console.log(res);
		throw new Error('Failed to get vehicles from db. Reason: ' + res);
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
