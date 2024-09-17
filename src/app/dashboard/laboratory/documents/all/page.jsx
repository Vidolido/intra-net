// state/actions
import { getSettings } from '@/app/dashboard/apiCalls';

// components
import AllDocuments from '@/components/Documents/AllDocuments/Index';

const page = async () => {
  const { settings: templateSettings } = await getSettings({
    documentStatus: 'published',
    isDeleted: false,
  });

  return <AllDocuments templateSettings={templateSettings} />;
};

export default page;
