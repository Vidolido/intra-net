import SettingsForm from '@/components/settings/SettingsForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = () => {
	return (
		<div>
			Settings
			<SettingsForm />
		</div>
	);
};

export default page;
