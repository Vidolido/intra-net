import DraftSetting from './DraftSetting';

const DisplayDraftSettings = ({ drafts }) => {
	return (
		<div className='flex flex-col gap-1'>
			<h2>Draft Settings</h2>
			{!drafts
				? 'There are no draft versions.'
				: drafts?.map((draft) => {
						return <DraftSetting key={draft._id} draft={draft} />;
				  })}
		</div>
	);
};

export default DisplayDraftSettings;
