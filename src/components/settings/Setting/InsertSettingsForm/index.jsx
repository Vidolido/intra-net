const InsertSettingsForm = ({ setting, languages }) => {
  let parameter =
    setting?.optionsSchema?.parameter?.name?.singular[languages[0].language];
  console.log(parameter, 'the parameter');
  return <div>InsertSettingsForm</div>;
};

export default InsertSettingsForm;
