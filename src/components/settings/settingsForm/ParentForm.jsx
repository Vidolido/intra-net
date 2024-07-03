'use client';
// state/actions
import { useSettingsContext } from '@/state/settingsContext';
import { createSetting } from '@/serverActions/settings';

// Оваа компонента треба да прима различна акција, акцијата да ја пратам како параметар од page.jsx
const ParentForm = ({ children, setting }) => {
	const { state } = useSettingsContext();
	const { _id } = setting;
	let addDraftId = createSetting.bind(null, _id);
	return <form action={addDraftId}>{children}</form>;
};

export default ParentForm;
