// state/actions
import { getLaboratoryDocuments } from '../../apiCalls';
import { getSettings } from '@/app/dashboard/apiCalls';

// components
import Filter from '@/components/Documents/allDocuments/Filter';

const page = async () => {
  // const { templateSettings } = await getTemplateSettings();
  const { settings: templateSettings } = await getSettings({
    documentStatus: 'published',
    isDeleted: false,
  });

  const { documents } = await getLaboratoryDocuments({
    documentStatus: 'published',
    sorted: true,
  });

  const { documents: notSorted } = await getLaboratoryDocuments({
    documentStatus: 'published',
  });
  return (
    <div className='w-full pr-6'>
      <h3>All Documents</h3>
      <Filter
        sorted={documents}
        notSorted={notSorted}
        templateSettings={templateSettings}
      />
    </div>
  );
};

export default page;
