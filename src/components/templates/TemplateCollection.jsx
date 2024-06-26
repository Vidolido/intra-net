import TemplateRow from './TemplateRow';

const TemplateCollection = ({ draft }) => {
	const { template } = draft;
	let currentGroup = null;
	const elements = [];

	template.forEach((item, index) => {
		if (item.grouped.isGrouped) {
			if (!currentGroup) {
				currentGroup = [];
			}
			currentGroup.push(
				<TemplateRow key={item._id} item={item} document={draft._id} />
			);

			// If it's the last item or the next item is not in the same group, push the group to elements
			if (
				index === template.length - 1 ||
				!template[index + 1].grouped.isGrouped ||
				template[index + 1].grouped.group._id !== item.grouped.group._id
			) {
				elements.push(
					<div key={`group-${item.grouped.group.id}`} className='group'>
						<h2>{item.grouped.group.name['en']}</h2>
						{currentGroup}
					</div>
				);
				currentGroup = null;
			}
		} else {
			// Да го проверам ова убаво
			if (currentGroup) {
				elements.push(
					<div key={`group-${currentGroup[0].key}`} className='group'>
						{currentGroup}
					</div>
				);
				currentGroup = null;
			}
			elements.push(
				<TemplateRow key={item._id} item={item} document={draft._id} />
			);
		}
	});

	return (
		<div>
			<div>TemplateCollection</div>
			{elements}
		</div>
	);
};

export default TemplateCollection;
