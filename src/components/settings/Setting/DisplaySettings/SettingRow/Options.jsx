'use client';

// comnponents
import OptionsSvg from '@/../public/options.svg';
import ContextButton from '@/components/buttons/ContextButton';
import { deleteSetting } from '@/serverActions/settings/deleteSetting';

const Options = ({
	documentId,
	settingId,
	option = null,
	onClick,
	handleExpand,
	handleEdit,
}) => {
	const handleDelete = async () => {
		await deleteSetting({ setting: settingId, document: documentId });
	};
	return (
		<div className='border-r flex justify-center items-center relative'>
			<OptionsSvg
				onClick={() => onClick(settingId)}
				className='text-slate-400 hover:text-red-600 text-center w-[25px] h-[25px] cursor-pointer'
			/>
			<div
				className={`flex flex-col absolute top-0 right-[-65px] ${
					option && option.showOptions ? 'visible' : 'hidden'
				}`}>
				<ContextButton
					label='expand'
					type='default'
					onClick={() => handleExpand(settingId)}
				/>
				<ContextButton
					label='edit'
					type='default'
					onClick={() => handleEdit(settingId)}
				/>
				<ContextButton
					label='delete'
					type='default'
					onClick={() => handleDelete(settingId)}
				/>
			</div>
		</div>
	);
};

export default Options;
