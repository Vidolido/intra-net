// components
// import IdentificationNumbers from './IdentificationNumbers';
import SelectFields from './SelectFields';
import TemplateForms from './TemplateForms';

function findHighestOrder(arr) {
	return arr.reduce((max, obj) => {
		return obj.order !== undefined && obj.order > max ? obj.order : max;
	}, 0);
}

function filterByLinkedSetting(fields, linkedSettings) {
	return fields.filter((field) =>
		linkedSettings.some((link) => field.links.includes(link))
	);
}

const Document = ({
	customers,
	document,
	settings,
	productAliases,
	languages,
	laboratorySettings,
	templates,
}) => {
	const hasSelectedTemplate = !document?.templateId ? true : false;
	// const hasSelectedTemplate = !document.templateId ? true : false;

	return (
		<div className='flex gap-6 pr-3'>
			{!hasSelectedTemplate && (
				<div className='flex flex-col gap-1 shrink'>
					<SelectFields
						customers={customers}
						fields={settings.fields}
						document={document}
						productAliases={productAliases}
					/>
				</div>
			)}
			<div className='w-[80%]'>
				<TemplateForms
					document={document}
					languages={languages}
					settings={settings}
					laboratorySettings={laboratorySettings}
					templates={templates}
				/>
			</div>
		</div>
	);
};

export default Document;
