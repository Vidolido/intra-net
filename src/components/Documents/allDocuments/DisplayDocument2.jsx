import Link from 'next/link';

// state/actions
import { formatDate } from '@/utils/formatDate';

const DisplayDocument = ({
  document,
  products,
  types,
  countries,
  dateTime = false,
  classes,
}) => {
  const product = products.find(
    (product) => product.id === document?.header?.product
  );
  const sampleType = types.find(
    (type) => type.id === document?.header?.sampleType
  );
  const documentType = types.find(
    (type) => type.id === document?.header?.documentType
  );
  const origin = countries.find(
    (country) => country.id === document?.header?.origin
  );
  const { date, time } = formatDate(document?.createdAt);

  //   console.log(dateTime, 'DATE TIME');
  return (
    <>
      <Link href={`/dashboard/laboratory/documents/${document._id}`}>
        <div className={`border-b hover:border-red-300 grid gap-4 ${classes}`}>
          <p>{product?.name['en']}</p>
          <p>{origin?.name['en'] || '--'}</p>
          <p>{sampleType?.name['en'] || '--'}</p>
          <p>{documentType?.name['en'] || '--'}</p>
          {dateTime && <p>{`${date} ${time}`}</p>}
        </div>
      </Link>
    </>
  );
};

export default DisplayDocument;
