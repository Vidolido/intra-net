const TemplateForm = ({ settings }) => {
	return (
		<form>
			<h4>Template Form</h4>
			{settings &&
				settings?.map((setting) => {
					return (
						<p key={setting._id}>{setting.parameter.name.singular['en']}</p>
					);
				})}
		</form>
	);
};

export default TemplateForm;
