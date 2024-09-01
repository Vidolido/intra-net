import CreateDraftTemplateButton from './(page)/CreateDraftTemplateButton';
import DisplayDraftTemplates from './(page)/DisplayDraftTemplates';
import PublishedTemplates from './(page)/PublishedTemplates';

const Templates = ({ published, drafts, settings }) => {
	return (
		<div className='w-full pr-2'>
			<CreateDraftTemplateButton />
			<div className='flex justify-between w-full'>
				<PublishedTemplates published={published} settings={settings} />
				<DisplayDraftTemplates drafts={drafts} />
			</div>
		</div>
	);
};

export default Templates;
