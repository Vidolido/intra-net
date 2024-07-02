'use client';
import Link from 'next/link';

// state/actions
// import { deleteDraftSetting } from '@/serverActions/settings/deleteDraftSetting';

// components
import ContextButton from '@/components/buttons/ContextButton';

const PublishedTemplate = ({ setting, products }) => {
  const handleDelete = async (_id) => {
    // await deleteDraftSetting(_id);
  };
  console.log(setting.product, 'THIS ONE SETTING');
  console.log(products);
  console.log(products.find((prod) => prod.id === setting.product));
  const type = products.find((prod) => prod.id === setting.product);
  return (
    <Link
      key={setting?._id}
      href={`/dashboard/laboratory/templates/edit/${setting._id}`}
      className='flex gap-2 justify-between items-center border-2 border-slate-200 hover:border-red-200 p-1'>
      <h5>{type.name['en'] || setting._id}</h5>
      <ContextButton
        label='Delete'
        type='edit'
        onClick={() => handleDelete(setting._id)}
        classes='self-end'
      />
    </Link>
  );
};

export default PublishedTemplate;
