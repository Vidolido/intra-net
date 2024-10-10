'use client';
import { useEffect, useState } from 'react';

// state/actions
import { saveDocumentBasicInfo } from '@/data-access/documents/document/saveDocumentBasicInfo';

// components
import ContextButton from '@/components/buttons/ContextButton';
// import SingleField from './CheckBoxFields/SingleField';
import InputFields from './InputFIelds';
import CheckBoxFields from './CheckBoxFields';

function filterByLinkedSetting(fields, linkedSettings) {
  return fields.filter((field) =>
    linkedSettings.some((link) => field.links.includes(link))
  );
}

// function setCheckedStatus(fields, linkedSettings) {
//   return fields.reduce((acc, currentValue) => {
//     if (currentValue.links.includes(linkedSettings))
//       currentValue.checked = true;
//     else currentValue.checked = false;
//     acc.push(currentValue);
//     return acc;
//   }, []);
// }

function setCheckedStatus(fields, documentFields) {
  return fields.reduce((acc, currentValue) => {
    // Check if the current field exists in document.basicInfo.fields by matching _id
    const isFieldInDocument = documentFields.some(
      (docField) => docField._id.toString() === currentValue._id.toString()
    );

    // Set checked status based on whether the field is in document.basicInfo.fields
    currentValue.checked = isFieldInDocument;

    acc.push(currentValue); // Push updated field to the accumulator
    return acc;
  }, []);
}

function findType(types, documentType) {
  // return types.find((type) => type._id === documentType).name.en;
  return types.find((type) => type._id === documentType)._id;
}

const SelectFields = ({
  customers,
  fields: dbFields,
  document,
  laboratoryNumber,
  documentTypes,
  productAliases,
}) => {
  const fieldsInitState = () => {
    let mutFields = filterByLinkedSetting(dbFields, [
      document?.header?.documentType,
      'other',
    ]);
    console.log(mutFields, 'THE MUTATED FIELDS');
    // return setCheckedStatus(mutFields, document?.header?.documentType);
    return setCheckedStatus(mutFields, document?.basicInfo?.fields || []);
  };

  const [fields, setFields] = useState(fieldsInitState);

  useEffect(() => {
    if (document?.basicInfo) {
      const newFieldsCheckedStatus = fields.map((field) => {
        const isChecked = document.basicInfo.fields.some(
          (f) => f._id === field._id
        );
        return { ...field, checked: !isChecked ? field.checked : isChecked };
      });
      setFields(newFieldsCheckedStatus);
    }
  }, [document?.basicInfo]);

  const handleClick = async (e) => {
    let selectFields = e.target.form.elements
      .namedItem('document-fields')
      .querySelectorAll('select');
    let inputFields = e.target.form.elements
      .namedItem('document-fields')
      .querySelectorAll('input');

    let merged = Array.from(selectFields).concat(Array.from(inputFields));

    const basicInfo = Array.from(merged).reduce(
      (acc, currentValue) => {
        if (currentValue.name === 'customer') {
          acc.customer = {
            customerId: currentValue.value,
          };
        } else {
          acc.fields.push({
            _id: currentValue.id,
            data: currentValue.value,
          });
        }
        return acc;
      },
      { customer: {}, fields: [] }
    );

    // HANDLE ERRORS HERE
    await saveDocumentBasicInfo(basicInfo, document._id);
  };
  const isTestReport =
    documentTypes.find((type) => type._id === document.header.documentType).name
      .en === 'Test Report';
  const isCertificate =
    documentTypes.find((type) => type._id === document.header.documentType).name
      .en === 'Certificate';

  let isOfType = findType(documentTypes, document.header.documentType);

  // console.log(isOfType, 'is of type');
  return (
    <form className='bg-slate-100 border border-t-0 border-slate-200 rounded'>
      <CheckBoxFields
        document={document}
        fields={fields}
        setFields={setFields}
      />
      <InputFields
        customers={customers}
        fields={fields}
        isTestReport={isTestReport}
        isCertificate={isCertificate}
        documentHeader={document.header}
        laboratoryNumber={laboratoryNumber}
        productAliases={productAliases}
        basicInfo={document?.basicInfo}
      />
      <div className='p-1'>
        <ContextButton
          label='Save'
          type='edit'
          onClick={handleClick}
          classes='w-full'
        />
      </div>
    </form>
  );
};

export default SelectFields;
