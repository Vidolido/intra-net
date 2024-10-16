'use server';

import { queryParser } from '@/utils/analyses/queryParser';

// `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings`,

// sectors
export async function getSectors() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/get-sectors`
  );

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get sectors from db. Reason: ' + res);
  }

  return res.json();
}

// languages
export async function getLanguages() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/languages`);

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get languages from db. Reason: ' + res);
  }

  return res.json();
}

// draft settings
export async function getSettings(searchQuery) {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/get-settings`;

  let query = queryParser(baseUrl, searchQuery);

  const res = await fetch(query);

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get settings from db. Reason: ' + res);
  }

  return res.json();
}

export async function getSettingById(_id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/by-id/${_id}`
  );

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get setting from db. Reason: ' + res);
  }

  return res.json();
}
//^^ NOVI
////getDraftSettings
// export async function getDraftSettings() {
//   const res = await fetch(
//     'http://localhost:3000/api/settings/get-all-draft-settings'
//   );

//   if (!res.ok) {
//     console.log(res);
//     throw new Error('Failed to get draft settings from db. Reason: ' + res);
//   }

//   return res.json();
// }

export async function getDraftSetting() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/draft-setting`,
    {
      next: { tags: ['draft'] },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get vehicles from db. Reason: ' + res);
  }

  return res.json();
}

export async function getDraftById(_id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/edit-draft/${_id}`
  );

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get draft setting from db. Reason: ' + res);
  }

  return res.json();
}

// export async function getPublishedSettings() {
//   const res = await fetch(
//     'http://localhost:3000/api/settings/get-published-settings'
//   );

//   if (!res.ok) {
//     console.log(res);
//     throw new Error('Failed to get draft settings from db. Reason: ' + res);
//   }

//   return res.json();
// }

export async function getPublishedById(_id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/settings/edit-setting/${_id}`
  );

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get setting from db. Reason: ' + res);
  }

  return res.json();
}

// draft settings

// labodatory templates
export async function getLaboratorySettings() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/laboratory/template-setting`
  );

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get settings from db. Reason: ' + res);
  }

  return res.json();
}

export async function getGroups() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/laboratory/template-groups`
  );

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get groups from db. Reason: ' + res);
  }

  return res.json();
}

// export async function getLaboratoryDraftTemplates() {
// 	const res = await fetch(
// 		'http://localhost:3000/api/laboratory/all-draft-templates'
// 	);

// 	if (!res.ok) {
// 		console.log(res);
// 		throw new Error('Failed to get draft templates from db. Reason: ' + res);
// 	}

// 	return res.json();
// }

export async function getLaboratoryDraftById(_id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/laboratory/edit-draft/${_id}`
  );

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get draft template from db. Reason: ' + res);
  }

  return res.json();
}

// export async function getPublishedTemplates() {
// 	const res = await fetch(
// 		'http://localhost:3000/api/laboratory/published-templates'
// 	);

// 	if (!res.ok) {
// 		console.log(res);
// 		throw new Error('Failed to get templates from db. Reason: ' + res);
// 	}

// 	return res.json();
// }

// export async function getAllTemplates() {
// 	const res = await fetch(`http://localhost:3000/api/laboratory/all-templates`);

// 	if (!res.ok) {
// 		console.log(res);
// 		throw new Error('Failed to get draft templates from db. Reason: ' + res);
// 	}

// 	return res.json();
// }
// labodatory templates
