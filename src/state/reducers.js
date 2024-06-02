export const addSettingReducer = (draft, action) => {
	switch (action.type) {
		case 'add': {
			console.log('add');
			break;
		}
		default: {
			console.log('default');
		}
	}
};
