// functions
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';

// state/actions
import { LaboratoryContextProvider } from '@/state/laboratoryContext';

// components
import TemplateSelect from './TemplateSelect';
import Fields from './Fields';
import BasicInputFields from './BasicInputFields';
import AnalysisTemplate from './AnalysisTemplate';

const AnalysesForm = ({ templateSettings, languages, allTemplates }) => {
  let { products, types, countries, fields } =
    mutateTemplateSettings(templateSettings);
  return (
    <form>
      <LaboratoryContextProvider>
        <div>
          <TemplateSelect
            languages={languages}
            products={products}
            types={types}
            countries={countries}
          />

          <Fields languages={languages} fields={fields.settings} />
          <BasicInputFields />
        </div>

        <div>
          <LaboratoryContextProvider>
            <AnalysisTemplate templates={allTemplates} />
          </LaboratoryContextProvider>
        </div>
      </LaboratoryContextProvider>
    </form>
  );
};

export default AnalysesForm;
