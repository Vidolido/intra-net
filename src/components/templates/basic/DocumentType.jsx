import SelectInput from '@/components/inputs/SelectInput';
import { documentTypes } from './documentTypes';

const DocumentType = () => {
  const types = documentTypes;
  return (
    <fieldset name='document-type'>
      <h6>DocumentType</h6>
      {/* <SelectInput options={types} property='name' defaultLanguage='en' /> */}
      <SelectInput options={types} value='id' defaultLanguage='en' />
    </fieldset>
  );
};

export default DocumentType;
