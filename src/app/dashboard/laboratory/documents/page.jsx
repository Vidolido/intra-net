// state/actions
import { getSettings } from '../../apiCalls';
import { getLaboratoryDocuments } from '../apiCalls';
import { nameArray } from '@/utils/nameArray';

// components
import Documents from '@/components/Documents';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  // const { templateSettings } = await getTemplateSettings();
  //   const { sectors } = await getSectors();

  const { settings: templateSettings } = await getSettings({
    documentStatus: 'published',
    isDeleted: false,
  });

  const { documents: draftDocuments } = await getLaboratoryDocuments({
    documentStatus: 'draft',
  });

  const { documents: publishedDocuments } = await getLaboratoryDocuments({
    documentStatus: 'published',
    sorted: true,
  });

  let products = templateSettings.filter(
    (setting) => setting.settingName === 'Products'
  );

  let mutProducts = products[0]?.settings?.map((setting) => ({
    id: setting._id,
    ...nameArray(setting.parameter.inputValue),
  }));
  return (
    <Documents
      templateSettings={templateSettings}
      draftDocuments={draftDocuments}
      publishedDocuments={publishedDocuments}
      products={mutProducts}
    />
  );
};

export default page;
