'use server';

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
