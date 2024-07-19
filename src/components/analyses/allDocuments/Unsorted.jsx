// state/actions
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';
import { nameArray } from '@/utils/nameArray';

// components
import DisplayDocument from './DisplayDocument';

const Unsorted = ({ document, templateSettings }) => {
  let { products, types, countries } = mutateTemplateSettings(templateSettings);

  let mutProducts = products?.settings?.map((setting) => ({
    id: setting._id,
    ...nameArray(setting.parameter.inputValue),
  }));
  let mutTypes = types?.settings?.map((setting) => ({
    id: setting._id,
    ...nameArray(setting.parameter.inputValue),
  }));
  let mutCountries = countries?.settings?.map((setting) => ({
    id: setting._id,
    ...nameArray(setting.parameter.inputValue),
  }));
  return (
    <DisplayDocument
      document={document}
      products={mutProducts}
      types={mutTypes}
      countries={mutCountries}
      dateTime={true}
      classes='grid-cols-5'
    />
  );
};

export default Unsorted;
