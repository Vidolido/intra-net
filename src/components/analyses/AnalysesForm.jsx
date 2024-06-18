'use client';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
// import TemplateSelection from './TemplateSelection';
import TemplateSelect from './TemplateSelect';
import Fields from './Fields';

const AnalysesForm = ({ templateSettings, languages, laboratoryTemplates }) => {
  let { products, types, countries, fields } = templateSettings.reduce(
    (acc, currentValue) => {
      switch (currentValue.settingName) {
        case 'Products': {
          acc = {
            ...acc,
            products: currentValue,
          };
          break;
        }
        case 'Types': {
          acc = {
            ...acc,
            types: currentValue,
          };
          break;
        }
        case 'Countries': {
          acc = {
            ...acc,
            countries: currentValue,
          };
          break;
        }
        case 'Fields': {
          acc = {
            ...acc,
            fields: currentValue,
          };
          break;
        }
        default: {
          return acc;
        }
      }
      return acc;
    },
    {}
  );

  return (
    <form>
      <TemplateSelect
        languages={languages}
        products={products}
        types={types}
        countries={countries}
      />
      <Fields languages={languages} fields={fields.settings} />
    </form>
  );
};

export default AnalysesForm;
