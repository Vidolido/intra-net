// state/actions
import { nameArray } from '@/utils/nameArray';
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';

// components
import DisplayDocument from './DisplayDocument';

const SingleDateCollection = ({
  collection,
  templateSettings,
  // showOptions,
  // documentClasses,
}) => {
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

  return collection.documents.map((document) => (
    <DisplayDocument
      key={document._id}
      document={document}
      products={mutProducts}
      types={mutTypes}
      countries={mutCountries}
      // showOptions={showOptions}
      classes={'grid-cols-4'}
    />
  ));
};

export default SingleDateCollection;
