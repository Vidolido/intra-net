// state/actions
import { getDraftById, getLanguages } from '@/app/dashboard/apiCalls';

// components
import Setting from '@/components/settings/Setting';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async ({ params }) => {
  const { languages } = await getLanguages();
  const { _id } = params;
  const { draft } = await getDraftById(_id);
  return (
    <Setting title='Edit Draft Setting' setting={draft} languages={languages} />
  );
};

export default page;
