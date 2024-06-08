const DisplayDraftSettings = ({ drafts }) => {
	console.log(drafts, 'DRAFTS');
	return (
		<div>
			{!drafts
				? 'There are no draft versions.'
				: drafts?.map((draft) => {
						return (
							<div key={draft?._id}>
								<h5>{draft?._id}</h5>
								<p>{draft?.name}</p>
							</div>
						);
				  })}
		</div>
	);
};

export default DisplayDraftSettings;
