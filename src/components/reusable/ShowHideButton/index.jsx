import ArrowSvg from '@/../public/arrow.svg';

const ShowHideButton = ({ heading, visible, onClick }) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className='group flex justify-between items-center w-full'>
			<h3 className='text-left'>{heading}</h3>
			<ArrowSvg
				className={`w-[22px] h-[22px] m-1 fill-red-500 group-hover:fill-red-300 ${
					visible ? '' : 'rotate-180'
				}`}
			/>
		</button>
	);
};

export default ShowHideButton;
