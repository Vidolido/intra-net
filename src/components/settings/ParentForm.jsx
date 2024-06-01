'use client';
// state/actions
import { useSettingsContext } from '@/state/settingsContext';
import { createSetting } from '@/serverActions/settings';

// components
import SubmitButton from '../buttons/SubmitButtons';

const ParentForm = ({ children }) => {
	const { state } = useSettingsContext();

	const sendState = createSetting.bind(null, state);

	return (
		<form action={sendState}>
			{children}
			{/* <SubmitButton label={'Create'} /> */}
		</form>
	);
};

export default ParentForm;
