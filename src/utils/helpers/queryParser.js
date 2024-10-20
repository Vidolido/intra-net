export function queryParser(baseUrl, searchParams) {
  const url = new URL(baseUrl);
  Object.keys(searchParams).forEach((key) =>
    url.searchParams.append(key, searchParams[key])
  );
  return url.toString();
}
