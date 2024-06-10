// components
import SelectInput from '../../inputs/SelectInput';

const TemplateFormInput = ({ settings, defaultLanguage }) => {
	let properties = settings.map((setting) => ({
		_id: setting._id,
		name: { ...setting.parameter.inputValue },
	}));
	return (
		<div className='grid grid-cols-6 gap-4'>
			<div>
				<SelectInput
					options={properties}
					defaultLanguage={defaultLanguage.language}
					classes='min-w-[100px]'
				/>
			</div>
		</div>
	);
};

export default TemplateFormInput;
