'use server';

export async function getLanguages() {
  const res = await fetch('http://localhost:3000/api/languages');

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get languages from db. Reason: ' + res);
  }

  return res.json();
}

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

export async function getLaboratorySettings() {
  const res = await fetch(
    'http://localhost:3000/api/laboratory/template-setting'
  );

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get vehicles from db. Reason: ' + res);
  }

  return res.json();
}
