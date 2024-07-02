'use client';

// state/actions
import { useErrorContext } from '@/state/ErrorContext';
import { saveBasicData } from '@/serverActions/laboratoryTemplates/saveBasicData';

// components
import ContextButton from '@/components/buttons/ContextButton';

const SaveBasic = ({ draft }) => {
  const { error: stateError, setError } = useErrorContext();
  const handleClick = async (e) => {
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

    const headerData = {
      product: product.value,
      sampleType: sampleType.value,
      origin: countryOfOrigin.value,
      documentType: documentType.value,
    };
    // let { error, data } = await saveBasicData({ headerData, document: draft._id });
    await saveBasicData({ headerData, document: draft._id });
  };
  return (
    <ContextButton
      label='Save'
      type='edit'
      onClick={handleClick}
      classes='self-end'
    />
  );
};

export default SaveBasic;
