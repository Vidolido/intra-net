'use client';
import { useErrorContext } from '@/state/ErrorContext';

const ActionButtons = ({ label, action, parameters }) => {
  const { setError } = useErrorContext();

  return (
    <button
      type='button'
      className='bg-red-500 disabled:bg-red-200 hover:bg-red-700 text-white font-semibold pt-[1px] pb-[3px] px-5 rounded'
      onClick={async () => {
        const { error } = await action(parameters);
        setError((prevState) => ({
          ...prevState,
          error: { ...prevState.error, ...error },
        }));
        // setError((prevState) => {
        //   if (error) {
        //     return {
        //       ...prevState,
        //       error,
        //     };
        //   } else return {};
        // });
        // console.log(error, 'THE ERROR');
      }}>
      {label}
    </button>
  );
};

export default ActionButtons;
