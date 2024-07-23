// state/actions
// components
import HeaderForm from './HeaderForm';

const Setting = ({ title, setting, languages }) => {
  return (
    <div className=' min-w-[300px] max-w-fit'>
      <h2>{title}</h2>
      <HeaderForm setting={setting} languages={languages} />
    </div>
  );
};

export default Setting;
