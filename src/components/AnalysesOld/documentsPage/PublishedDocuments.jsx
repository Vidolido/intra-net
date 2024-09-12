'use client';
import Link from 'next/link';

// state/actions
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';
import { nameArray } from '@/utils/nameArray';
// import { deleteDraftSetting } from '@/serverActions/settings/deleteDraftSetting';

// components
import ContextButton from '@/components/buttons/ContextButton';

const PublishedDocuments = ({ analysis, templateSettings }) => {
  let { types, countries } = mutateTemplateSettings(templateSettings);

  const handleDelete = async (_id) => {
    // await deleteDraftSetting(_id);
  };

  //   console.log(types, countries);

  let mutTypes = types?.settings?.map((setting) => ({
    id: setting._id,
    ...nameArray(setting.parameter.inputValue),
  }));
  let mutCountries = countries?.settings?.map((setting) => ({
    id: setting._id,
    ...nameArray(setting.parameter.inputValue),
  }));

  // console.log(mutTypes, mutCountries);

  const type = mutTypes.find(
    (type) => type.id === analysis?.header?.documentType
  );
  const country = mutCountries.find(
    (country) => country.id === analysis?.header?.origin
  );

  return (
    <>
      <p>{type?.name['en'] || ''}</p>
      <p>{country?.name['en'] || ''}</p>
      <div className='flex justify-end gap-2'>
        <Link
          href={`/dashboard/laboratory/analyses/edit/${analysis._id}`}
          className='hover:underline text-black'>
          edit
        </Link>
        <ContextButton
          label='delete'
          type='default'
          onClick={() => handleDelete(analysis._id)}
          classes='self-end'
        />
      </div>
    </>
  );
};

export default PublishedDocuments;
