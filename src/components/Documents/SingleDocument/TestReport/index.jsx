// state/actions
// import {
//   useSingleDocumentContext,
//   useSingleDocumentDispatchContext,
// } from '@/state/laboratory/documents/singleDocument/singleDocumentContext';
import { nameArray } from '@/utils/nameArray';
import { formatDate } from '@/utils/formatDate';

// components
import ViewTemplate from './ViewTemplate';

const mutateBasicInfo = (sourceArray, matchArray) => {
  return sourceArray
    .map(({ _id, parameter }) => {
      const match = matchArray.find(({ _id: matchId }) => matchId === _id);

      return match
        ? { _id: _id, name: parameter.inputValue, data: match.data }
        : null;
    })
    .filter(Boolean); // Filter out null or undefined items
};

function isValidDate(str) {
  // Check if the string matches a common date pattern (YYYY-MM-DD or similar)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (typeof str !== 'string' || !datePattern.test(str)) {
    return false; // Not a valid date string format
  }

  const date = new Date(str);

  // Check if the date is valid
  return !isNaN(date.getTime());
}

const TestReport = ({
  customers,
  document,
  documentTypes,
  products,
  productAliases,
  fields,
  laboratorySettings,
  languages,
}) => {
  // const { template } = useSingleDocumentContext();
  // const dispatch = useSingleDocumentDispatchContext();

  let { date, time } = formatDate(new Date(document.createdAt));
  let names = products?.settings.map((setting) => ({
    _id: setting._id,
    ...nameArray(setting.parameter.inputValue),
  }));

  let product = names.find((prod) => prod._id === document?.header?.product);

  let productAlias = productAliases.find(
    (pA) => pA._id === document.header.product
  );

  let customer = customers.find(
    (customer) => customer._id === document?.basicInfo?.customer?.customerId
  );

  let documentType = documentTypes.find(
    (docType) => docType._id === document?.header?.documentType
  );

  let mutBasicInfo = mutateBasicInfo(
    fields.settings,
    document.basicInfo.fields
  );

  // console.log(mutBasicInfo, 'mutBasicInfo');

  let laboratoryNumber = mutBasicInfo.find(
    (info) => info.name.en === 'Laboratory Number'
  );

  console.log(document, 'document in test report');

  return (
    <div className='w-[70%] mx-auto'>
      <div className='flex justify-evenly'>
        {/* прв ред */}
        <div>Окта лого</div>
        <div>Акредитација лого</div>
        <div></div>
      </div>
      <div className='flex justify-between'>
        {/* втор ред */}
        <div>
          <div>
            <h6>ОКТА - РАФИНЕРИЈА НА НАФТА</h6>
            <p className='text-sm'>Ул. 1 Бр. 25 Миладиновци - Илинден</p>
            <p className='text-sm'>СКОПЈЕ, Поштенски фах 66</p>
            <p className='text-sm'>
              Тел: +389 2 2 532 000, факс: +389 2 2 532 502
            </p>
          </div>
        </div>
        <div>
          {/* Ова треба да доаѓа од база */}
          <p className='text-sm'>
            <strong>Нарачател на тестирањето</strong>/Customer
          </p>
          <h6>{customer?.name?.mk}</h6>
          <p className='text-sm'>{customer.address.mk}</p>
          <p className='text-sm uppercase'>
            {customer?.city?.mk}, Поштенски фах 66
          </p>
        </div>
      </div>
      <div className='flex gap-10 justify-center my-4'>
        {/* трет ред */}
        <div className='flex flex-col justify-center'>
          <h5 className='uppercase font-semibold'>
            {documentType?.parameter?.inputValue?.mk} бр:
          </h5>
          <h5 className='uppercase font-semibold'>
            {documentType?.parameter?.inputValue?.en} no:
          </h5>
        </div>
        <div className='flex justify-center items-center border border-slate-700 p-4'>
          <p>{laboratoryNumber?.data || ''}</p>
        </div>
      </div>
      <div>
        {/* четврт ред */}
        <div className='w-fit text-sm'>
          {mutBasicInfo &&
            mutBasicInfo.map((infoField) => {
              // console.log(infoField.data, 'info Data');
              {
                /* let test = isValidDate(infoField.date); */
              }
              // console.log(test, 'THE TEST');
              //   let { date } = Date(infoField.data)
              //     ? formatDate(infoField.data)
              //     : infoField;
              //   console.log(date, 'the date');
              if (infoField.name.en === 'Sample') {
                let aliases = productAliases.find(
                  (alias) => alias._id === product._id
                );
                let productAlias = aliases.aliases.find(
                  (alias) => alias._id === infoField.data
                );

                return (
                  <div
                    key={infoField._id}
                    className='grid grid-cols-[1fr_1fr] gap-10'>
                    <div>
                      <p className='font-semibold'>{infoField.name.mk}</p>
                      <p>{infoField.name.en}</p>
                    </div>

                    <div>
                      <p className='font-semibold'>{productAlias?.value?.mk}</p>
                      <p> {productAlias?.value?.en}</p>
                    </div>
                  </div>
                );
              } else
                return (
                  <div
                    key={infoField._id}
                    className='grid grid-cols-[1fr_1fr] gap-10'>
                    <div>
                      <p className='font-semibold'>{infoField.name.mk}</p>
                      <p>{infoField.name.en}</p>
                    </div>

                    <div className='flex items-center'>
                      <p>
                        {infoField.name.en === 'Laboratory Number'
                          ? infoField.data.split('/')[0]
                          : infoField.data}
                      </p>
                    </div>
                  </div>
                );
            })}
        </div>
      </div>
      <div>
        {/* Петти ред */}
        <ViewTemplate
          template={document.template}
          templateId={document.templateId}
          laboratorySettings={laboratorySettings}
          defaultLanguage={languages[0]}
        />
      </div>
      <div>
        {/* шести ред */}
        <div className='text-sm'>
          <p>Забелешки/Notes:</p>
          <ul>
            <li>
              - Анализата се однесува само на донесениот примерок од страна на
              клиентот.
            </li>
            <li>
              - The analysis refers only to the sample brought by the customer.
            </li>
            <li>- Методите означени со астериск (*) не се акредитирани.</li>
            <li>- Methods noted with asterisk (*) are not accredited.</li>
          </ul>
        </div>
      </div>
      <div className='flex justify-between'>
        <div>
          <p>Скопје</p>
          <p>{`${date} ${time}`}</p>
        </div>
        <div>Потпис и печат</div>
      </div>
    </div>
  );
};

export default TestReport;
