'use client';
import Link from 'next/link';

// state/actions
import { deleteDocument } from '@/data-access/documents/deleteDocument';

// components
import ContextButton from '@/components/buttons/ContextButton';

const DraftDocument = ({ document }) => {
	const handleDelete = async (_id, documentStatus) => {
		await deleteDocument(_id, documentStatus);
	};
	return (
		<div className='flex gap-2 justify-between p-2'>
			<Link
				key={document?._id}
				href={`/dashboard/laboratory/documents/${
					document.documentStatus === 'draft' ? document.documentStatus : 'edit'
				}/${document._id}`}>
				<h5>{document?._id}</h5>
				{/* <p>{document?.settingName}</p> */}
			</Link>
			<ContextButton
				label='Delete'
				type='edit'
				onClick={() => handleDelete(document._id, document.documentStatus)}
			/>
		</div>
	);
};

export default DraftDocument;
