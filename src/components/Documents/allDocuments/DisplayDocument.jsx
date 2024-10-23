import Link from 'next/link';

// state/actions
import { formatDate } from '@/utils/formatDate';

const DisplayDocument = ({
	document,
	settings,
	dateTime = false,
	time: showOnlyTime = false,
	classes,
}) => {
	const product = settings.products.find(
		(product) => product._id === document?.header?.product
	);
	const sampleType = settings.types.find(
		(type) => type._id === document?.header?.sampleType
	);
	const documentType = settings.types.find(
		(type) => type._id === document?.header?.documentType
	);
	const origin = settings.origin.find(
		(country) => country._id === document?.header?.origin
	);
	const { date, time } = formatDate(document?.createdAt);

	let completeDateTime =
		(document?.documentInfo?.meta != null &&
			document?.documentInfo?.meta?.find(
				(field) =>
					field.name.en === 'Date of performance of anlysis' ||
					field.name.en === 'Quality Certificate Date from'
			)?.value) ||
		'';
	let { time: issuedTime } = formatDate(completeDateTime);

	return (
		<>
			<Link href={`/dashboard/laboratory/documents/${document._id}`}>
				<div className={`border-b hover:border-red-300 grid gap-4 ${classes}`}>
					<p>{product?.name['en']}</p>
					<p>{origin?.name['en'] || '--'}</p>
					<p>{sampleType?.name['en'] || '--'}</p>
					<p>{documentType?.name['en'] || '--'}</p>
					{showOnlyTime && <p>{`${issuedTime}`}</p>}
					{dateTime && <p>{`${date} ${time}`}</p>}
				</div>
			</Link>
		</>
	);
};

export default DisplayDocument;
