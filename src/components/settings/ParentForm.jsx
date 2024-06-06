'use client';
// state/actions
import { useSettingsContext } from '@/state/settingsContext';
import { createSetting } from '@/serverActions/settings';

// components
import SubmitButton from '../buttons/SubmitButtons';

const ParentForm = ({ children }) => {
  const { state } = useSettingsContext();

  //   const sendState = createSetting.bind(null, state);
  console.log(state, 'THE STATE');
  return (
    // <form action={sendState}>
    <form action={createSetting}>
      {children}
      {/* <SubmitButton label={'Use Schema'} /> */}
    </form>
  );
};

export default ParentForm;
