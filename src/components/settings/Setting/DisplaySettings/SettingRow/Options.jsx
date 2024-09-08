// comnponents
import OptionsSvg from '@/../public/options.svg';

const Options = ({ onClick }) => {
	const handleShowOptions = (setting) => {
		console.log(setting);
	};
	return (
		<div className='border-r flex justify-center items-center'>
			<OptionsSvg
				onClick={() => onClick('setting')}
				className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer'
			/>
		</div>
	);
};

export default Options;
