'use client';

import Certificate from './Certificate';
import OtherDocuments from './OtherDocuments';
import TestReport from './TestReport';

const SingleDocument = ({
  customers,
  document,
  documentTypes,
  products,
  productAliases,
  fields,
  laboratorySettings,
  languages,
}) => {
  let isTestReport =
    documentTypes.find((type) => type._id === document.header.documentType)
      .parameter.inputValue['en'] === 'Test Report';

  let isCertificate =
    documentTypes.find((type) => type._id === document.header.documentType)
      .parameter.inputValue['en'] === 'Certificate';

  // console.log(isTestReport, 'isTestReport');
  if (isTestReport)
    return (
      <TestReport
        customers={customers}
        document={document}
        documentTypes={documentTypes}
        products={products}
        productAliases={productAliases}
        fields={fields}
        laboratorySettings={laboratorySettings}
        languages={languages}
      />
    );

  if (isCertificate)
    return (
      <Certificate
        customers={customers}
        document={document}
        documentTypes={documentTypes}
        products={products}
        productAliases={productAliases}
        fields={fields}
        laboratorySettings={laboratorySettings}
        languages={languages}
      />
    );

  if (!isTestReport && !isCertificate)
    return (
      <OtherDocuments
        document={document}
        products={products}
        laboratorySettings={laboratorySettings}
        languages={languages}
      />
    );

  return <h4>Empty document</h4>;
};

export default SingleDocument;
