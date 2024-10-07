'use client';

import InputType from '@/components/inputs/InputType';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import SelectInput from '@/components/inputs/SelectInput';

const EditRow = ({
  languages,
  documentId,
  setting,
  numberOfCollections,
  classes,
}) => {
  const mainParam = setting.parameter;
  const collections = setting.collections;
  let gridTemplateColumns = `repeat(${numberOfCollections},1fr)`;
  // console.log(setting, 'the setting');
  // console.log(mainParam, 'the mainParam');
  // console.log(collections, 'the collections');
  // console.log(gridTemplateColumns, 'the gridTemplateColumns');
  // console.log(numberOfCollections, 'the numberOfCollections');

  return (
    <form
      className={`grid col-span-4 h-[200px]`}
      style={{ gridTemplateColumns }}>
      <div className='flex'>
        {/* {mainParam.inputValue.en} */}
        <LanguageInputContainer fieldSetClass='w-fit' languages={languages} />
      </div>
      <div className='w-fif'>
        <InputType classes='w-fit' />
      </div>
      <div className='w-fif'>
        <InputType />
      </div>
      <div className='w-fif'>
        <InputType />
      </div>
    </form>
  );
};

export default EditRow;
