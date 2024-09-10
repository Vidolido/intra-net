// state/actions
import { getLaboratoryDocuments } from '../../apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';

// components
// import Labels from '@/components/analyses/allDocuments/Labels';
// import Unsorted from '@/components/analyses/allDocuments/Unsorted';
// import DateCollections from '@/components/analyses/allDocuments/DateCollections';
import Filter from '@/components/Analyses/allDocuments/filter/Filter';

const page = async () => {
  const { templateSettings } = await getTemplateSettings();

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
