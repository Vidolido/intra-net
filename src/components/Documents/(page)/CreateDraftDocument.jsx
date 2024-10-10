'use client';
import { useRouter } from 'next/navigation';

// state/actions
import { makeDraftDocument } from '@/data-access/documents/makeDraftDocument';

// components
import ContextButton from '@/components/buttons/ContextButton';

const CreateDraftDocuments = () => {
  const router = useRouter();

  const handleClick = async (e) => {
    const { draft } = await makeDraftDocument();
    // console.log(draft, 'the draft');
    router.push(`/dashboard/laboratory/documents/create?_id=${draft._id}`);
  };

  return (
    <ContextButton
      label='Create New Document'
      type='edit'
      onClick={handleClick}
    />
  );
};

export default CreateDraftDocuments;
