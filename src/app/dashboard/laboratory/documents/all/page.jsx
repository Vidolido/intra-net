// state/actions
import { getSettings } from '@/app/dashboard/apiCalls';

// components
import AllDocuments from '@/components/Documents/AllDocuments/Index';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { settings: templateSettings } = await getSettings({
		documentStatus: 'published',
		isDeleted: false,
	});

	return <AllDocuments templateSettings={templateSettings} />;
};

export default page;
