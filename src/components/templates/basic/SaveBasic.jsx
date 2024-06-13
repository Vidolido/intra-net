'use client';

// state/actions
import { useErrorContext } from '@/state/ErrorContext';
import { makeDraftTemplate } from '@/serverActions/laboratoryTemplates/makeDraftTemplate';
import ActionButtons from '@/components/buttons/ActionButtons';
import { saveBasic } from '@/serverActions/laboratoryTemplates/saveBasic';
import ContextButton from '@/components/buttons/ContextButton';

const SaveBasic = ({}) => {
  const { error, setError } = useErrorContext();
  console.log(error, 'the error in the button');
  const handleClick = (e) => {
    let product = e.target.form.elements
      .namedItem('product-list')
      .querySelector('select');

    let sampleType = e.target.form.elements
      .namedItem('sample-types')
      .querySelector('select');
    let countryOfOrigin = e.target.form.elements
      .namedItem('countries-of-origin')
      .querySelector('select');
    let documentType = e.target.form.elements
      .namedItem('document-type')
      .querySelector('select');
    console.log(product.value);
    console.log(sampleType.value);
    console.log(countryOfOrigin.value);
    console.log(documentType.value);
  };
  return (
    <>
      <ContextButton label='Save' onClick={handleClick} />
      {/* <ActionButtons label='Save' action={saveBasic} /> */}
      {/* <button
      type='button'
      onClick={async () => {
        const { error } = await makeDraftTemplate(parameters);
        setError((prevState) => ({
          ...prevState,
          error: { ...prevState.error, ...error },
          }));
          }}>
      Save
    </button> */}
    </>
  );
};

export default SaveBasic;
