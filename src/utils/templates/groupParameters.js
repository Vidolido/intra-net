export const groupParameters = (template) => {
	const newArray = [];
	let currentGroup = null;

	template &&
		template.forEach((currentValue) => {
			// console.log(currentValue, 'currentValue outside');
			if (currentValue.grouped.isGrouped) {
				if (
					!currentGroup ||
					currentGroup._id !== currentValue.grouped.group._id
				) {
					// Create a new group if there's no current group or the _id is different
					// console.log(currentValue, 'currentValue inside');
					currentGroup = {
						isGroup: true,
						name:
							currentValue.grouped.group.parameter?.inputValue ||
							currentValue.parameter.propertyValue,
						_id: currentValue?.grouped?.group?._id,
						items: [],
					};
					newArray.push(currentGroup);
				}
				currentGroup.items.push(currentValue);
			} else {
				console.log(currentValue, 'inside ELSE');
				currentGroup = null; // Reset the current group
				newArray.push(currentValue); // Push the non-grouped item to the new array
			}
			// console.log(newArray, currentGroup, 'INSIDE');
		});

	// console.log(newArray, currentGroup, 'OUTSIDE');

	return newArray;
};
