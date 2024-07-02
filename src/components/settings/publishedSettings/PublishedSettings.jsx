import PublishedSetting from './PublishedSetting';

const PublishedSettings = ({ published }) => {
  return (
    <div className='flex flex-col gap-1'>
      <h2>Settings</h2>
      {!published
        ? 'There are no published settings.'
        : published?.map((setting) => {
            return <PublishedSetting key={setting._id} setting={setting} />;
          })}
    </div>
  );
};

export default PublishedSettings;
