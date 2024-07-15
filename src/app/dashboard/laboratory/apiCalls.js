'use server';

import { queryParser } from '@/utils/analyses/queryParser';

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

export async function getDraftAnalysis() {
  const res = await fetch(
    'http://localhost:3000/api/laboratory/draft-analysis'
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
    throw new Error('Failed to get document from db. Reason: ' + res);
  }

  return res.json();
}

export async function getAnalysisById(_id) {
  const res = await fetch(
    `http://localhost:3000/api/laboratory/analysis-by-id/${_id}`
  );

  if (!res.ok) {
    console.log(res);
    throw new Error('Failed to get document from db. Reason: ' + res);
  }

  return res.json();
}
