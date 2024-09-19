// state/actions
import { getDocumentById } from '../../apiCalls';
import { getLaboratorySettings, getLanguages } from '@/app/dashboard/apiCalls';
import { getTemplateSettings } from '@/serverActions/laboratoryTemplates/getTemplateSettings';

// components
import SingleDocument from '@/components/Documents/viewDocument/SingleDocument';
// import SingleDocument from '@/components/Documents/SingleDocument';

const page = async ({ params }) => {
  let { _id } = params;
  const { templateSettings } = await getTemplateSettings();
  const { document } = await getDocumentById(_id);

  const { languages } = await getLanguages();

  const { setting } = await getLaboratorySettings();
  const { settings } = setting || [];

  let products = templateSettings.find(
    (setting) => setting.settingName === 'Products'
  );

  //   console.log(document, 'the document');

  return (
    <>
      <SingleDocument
        document={document}
        products={products}
        settings={settings}
        languages={languages}
      />
      {/* <SingleDocument /> */}
    </>
  );
};

export default page;
