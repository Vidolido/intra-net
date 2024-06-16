import TemplateRow from './TemplateRow';

const TemplateCollection = ({ draft }) => {
	const { template } = draft;
	return (
		<div>
			TemplateCollection
			{template &&
				template.map((item) => (
					<TemplateRow key={item._id} item={item} document={draft._id} />
				))}
		</div>
	);
};

export default TemplateCollection;
