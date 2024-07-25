export function buildPayload(formData) {
  return Array.from(formData).reduce((acc, [key, value]) => {
    if (key === 'document_id') return acc;

    const [mainKey, lang] = key.split('-');

    if (mainKey.includes('plural') || mainKey.includes('singular')) {
      const type = mainKey.includes('plural') ? 'plural' : 'singular';
      acc = {
        ...acc,
        parameter: {
          ...acc.parameter,
          name: {
            ...acc.parameter?.name,
            [type]: {
              ...acc.parameter?.name?.[type],
              [lang]: value,
            },
          },
        },
      };
    } else if (mainKey.includes('collection')) {
      const match = mainKey.match(/collection\[(\d+)\]/);
      if (match) {
        const collectionIndex = parseInt(match[1], 10);

        acc.collections = acc.collections || [];
        acc.collections[collectionIndex] = acc.collections[collectionIndex] || {
          name: {},
        };
        acc.collections[collectionIndex].name[lang] = value;
      }
    }

    return acc;
  }, {});
}
