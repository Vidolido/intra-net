'use client';
// state/actions
import { useSettingsContext } from '@/state/settingsContext';
import { createSetting } from '@/serverActions/settings';

// components
// import SubmitButton from '../buttons/SubmitButtons';

const ParentForm = ({ children, setting }) => {
	const { state } = useSettingsContext();
	const { _id } = setting;
	let addDraftId = createSetting.bind(null, _id);
	return (
		// <form action={sendState}>
		<form action={addDraftId}>
			{children}
			{/* <SubmitButton label={'Use Schema'} /> */}
		</form>
	);
};

export default ParentForm;
