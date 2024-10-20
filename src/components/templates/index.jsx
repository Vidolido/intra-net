import CreateDraftTemplateButton from './(page)/CreateDraftTemplateButton';
import DisplayDraftTemplates from './(page)/DisplayDraftTemplates';
import PublishedTemplates from './(page)/PublishedTemplates';

const Templates = ({ published, drafts, data }) => {
	return (
		<div className='w-full pr-2'>
			<CreateDraftTemplateButton schemaNames={data?.schemaNames} />
			<div className='flex justify-between w-full'>
				<PublishedTemplates published={published} data={data} />
				<DisplayDraftTemplates drafts={drafts} />
			</div>
		</div>
	);
};

export default Templates;
