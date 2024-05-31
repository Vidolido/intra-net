'use client';
import ContextButton from '../buttons/ContextButton';

const SaveOptionSchema = () => {
  const handleOnClick = (e) => {
    let mainParam = e.target.form.elements
      .namedItem('option-schema-main')
      .querySelectorAll('input');
    let options = e.target.form.elements
      .namedItem('option-schema-options')
      .querySelectorAll('input');
    console.log(mainParam, options);
  };
  return <ContextButton label='Use Schema' onClick={handleOnClick} />;
};

export default SaveOptionSchema;
