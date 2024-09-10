'use client';

import InputType from '@/components/inputs/InputType';
import SelectInput from '@/components/inputs/SelectInput';

const EditRow = ({ documentId, setting, classes }) => {
  const mainParam = setting.parameter;
  const collections = setting.collections;
  console.log(mainParam, 'the mainParam');
  console.log(collections, 'the collections');
  return (
    <form className={classes}>
      <div className='flex'>
        <label>
          <InputType />
        </label>
        <select>
          <option value=''>Main Parameter</option>
          <option value=''>Collections</option>
        </select>
        {/* <label>
          <span className='block'>Main Parameter</span>
          <input type='radio' name='parameter' id='' />
        </label>
        <label>
          <span className='block'>Collections</span>
          <input type='radio' name='parameter' id='' />
        </label> */}
      </div>
    </form>
  );
};

export default EditRow;
