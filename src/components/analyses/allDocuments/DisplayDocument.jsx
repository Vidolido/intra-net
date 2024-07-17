const DisplayDocument = ({ document, products, types, countries }) => {
  const product = products.find(
    (product) => product.id === document.header.product
  );
  const sampleType = types.find(
    (type) => type.id === document.header.sampleType
  );
  const documentType = types.find(
    (type) => type.id === document.header.documentType
  );
  const origin = countries.find(
    (country) => country.id === document.header.origin
  );
  return (
    <div className='grid grid-cols-4 gap-4 border rounded bg-white'>
      <p>{product.name['en']}</p>
      <p>{origin.name['en']}</p>
      <p>{sampleType?.name['en'] || 'none'}</p>
      <p>{documentType?.name['en']}</p>
    </div>
  );
};

export default DisplayDocument;
