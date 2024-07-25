// state/actions
import { getPublishedById, getLanguages } from '@/app/dashboard/apiCalls';

// components
import Setting from '@/components/settings/Setting';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
  const { languages } = await getLanguages();
  const { _id } = params;
  const { published } = await getPublishedById(_id);
  return (
    <Setting title='Edit Setting' setting={published} languages={languages} />
  );
};

export default page;
