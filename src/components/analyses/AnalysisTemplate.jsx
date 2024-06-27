'use client';

import { useLaboratoryContext } from '@/state/laboratoryContext';

const AnalysisTemplate = ({ templates }) => {
  const state = useLaboratoryContext();
  const { selectedTemplate } = useLaboratoryContext();
  let selection = templates.find(
    (template) => template._id === selectedTemplate
  );

  console.log(selection);

  return (
    <div>
      {!selection
        ? 'Please select a template'
        : selection.template.map((item) => (
            <div key={item._id} className='grid grid-cols-7 gap-4 mb-1'>
              <p>{item?.parameter?.propertyValue['en']}</p>
              {item.items &&
                Object.entries(item?.items).map((item) => {
                  return (
                    <div key={item[0]}>
                      {item[1].map((row) => (
                        <p key={row.id}>
                          {(typeof row.value === 'string' && row.value) ||
                            row.value['en'] ||
                            `${row?.value?.key} - ${row?.value?.value}`}
                          {/* {} */}
                        </p>
                      ))}
                    </div>
                  );
                })}
              <p>{item.result}</p>
              <p>{item.marginError}</p>
            </div>
          ))}
    </div>
  );
};

export default AnalysisTemplate;
