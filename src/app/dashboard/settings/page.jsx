// state/context
import { getSectors, getSettings } from '../apiCalls';

// components
import Settings from '@/components/Settings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
	const { sectors } = await getSectors();
	const { settings: drafts } = await getSettings({
		isDeleted: false,
	});
	const { settings: published } = await getSettings({
		documentStatus: 'published',
		isDeleted: false,
	});

	return <Settings sectors={sectors} drafts={drafts} published={published} />;
};

export default page;
