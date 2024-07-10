// state/actions
import { mutateTemplateSettings } from '@/utils/mutateTempalteSettings';

// components
import TemplateSelectForm from './selectTemplate/TemplateSelectForm';
import SelectFields from './infoFields/SelectFields';

const AnalysesForm = ({
  analysis,
  templateSettings,
  languages,
  settings,
  templates,
}) => {
  // Да направам проверка, доколку веќе има избран темплејт во анализата,
  // да ги искористи тие полиња наместо полињата од база
  // цел: да ја користам истата компонента за add, edit и edit-draft
  let { products, types, countries, fields } =
    mutateTemplateSettings(templateSettings);

  return (
    <>
      <div className='flex'>
        <TemplateSelectForm
          analysis={analysis}
          languages={languages}
          products={products}
          types={types}
          countries={countries}
          templates={templates}
        />
      </div>
      <div>
        <SelectFields fields={fields.settings} analysisId={analysis._id} />
      </div>
      {/* <form action={createDocument} className='flex'>
				<LaboratoryContextProvider>
					<div className='bg-slate-100 border-2 rounded p-1'>
						<TemplateSelect
							languages={languages}
							products={products}
							types={types}
							countries={countries}
							templates={templates}
						/>

						<Fields languages={languages} fields={fields.settings} />
						<BasicInputFields />
					</div>

					<div className='w-full flex-grow pl-2 pr-3'>
						<AnalysisTemplate
							templates={templates}
							languages={languages}
							settings={settings}
						/>
					</div>
				</LaboratoryContextProvider>
			</form> */}
    </>
  );
};

export default AnalysesForm;
