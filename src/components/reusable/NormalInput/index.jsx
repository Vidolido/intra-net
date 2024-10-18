import { useState } from 'react';

const NormalInput = ({ data = null, type = 'default', extractData = null }) => {
  const [value, setValue] = useState(data?.state || '');

  const typeClass = {
    default:
      'box-content border border-grey-50 border-opacity-60 rounded hover:border-red-200 focus:outline-none',
  };

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    extractData != null && extractData(value);
  };

  return (
    <fieldset className={data?.fieldsetClass || ''}>
      <label>{data?.label}</label>
      <input
        id={data?._id}
        type={data?.type}
        name={data.name}
        value={value}
        onChange={handleInputChange}
        onBlur={handleBlur}
        defaultValue={data.defaultValue}
        required={data?.required || false}
        className={`${typeClass[type]} ${data?.inputClass}`}
      />
    </fieldset>
  );
};

export default NormalInput;
