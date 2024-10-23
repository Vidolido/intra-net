'use client';
import { useCallback, useState } from 'react';
import { useFormState } from 'react-dom';

// state/actions
import { saveSettingHeader } from '@/serverActions/settings/saveSettingHeader';

// components
import ArrowSvg from '@/../public/arrow.svg';
import SelectInput from '@/components/reusable/SelectInput';
import NormalInput from '@/components/reusable/NormalInput';
import ContextButton from '@/components/buttons/ContextButton';

const status = [
	{
		name: {
			en: 'draft',
			mk: 'драфт',
			gr: 'гр',
		},
	},
	{
		name: {
			en: 'published',
			mk: 'објавен',
			gr: 'гр',
		},
	},
];

const HeaderForm = ({ languages, sectors, setting }) => {
	const [state, formAction] = useFormState(saveSettingHeader, {
		message: '',
		error: '',
	});

	let hasName = setting.settingName;
	const [visible, setVisible] = useState(!hasName);
	const toggleVisible = useCallback(() => setVisible((prev) => !prev), []);
	const settingName = !hasName ? '' : setting?.settingName;
	return (
		<form
			action={formAction}
			className='p-1 border border-slate-200 rounded w-full'>
			<input
				type='text'
				className='hidden'
				defaultValue={setting._id}
				name='document_id'
			/>
			<button
				type='button'
				onClick={toggleVisible}
				className='group flex justify-between items-center w-full'>
				<h4>Document Settings</h4>
				<ArrowSvg
					className={`w-[22px] h-[22px] m-1 fill-red-500 group-hover:fill-red-300 ${
						visible ? '' : 'rotate-180'
					}`}
				/>
			</button>
			{visible && (
				<div
					className={`flex w-full gap-[1px] bg-slate-100 border-[1px] border-slate-100 p-[1px] rounded`}>
					<SelectInput
						defaultLanguage={languages[0].language}
						data={{
							state: sectors,
							defaultValue: setting?.sector,
							label: 'Sector',
							selectName: 'sector',
							showEmptyOption: false,
							classes: 'flex flex-col items-start bg-white px-[2px]',
						}}
					/>
					<NormalInput
						data={{
							state: settingName,
							name: 'settingName',
							label: 'Setting Name',
							fieldsetClass: 'flex flex-col grow bg-white px-[2px]',
							inputClass: 'h-21px',
							required: true,
						}}
					/>

					{setting.settingName != null && (
						<SelectInput
							defaultLanguage={languages[0].language}
							data={{
								state: status,
								defaultValue: setting.documentStatus,
								label: 'Status',
								selectName: 'status',
								showEmptyOption: false,
								classes: 'flex flex-col items-start bg-white px-[2px]',
							}}
						/>
					)}
				</div>
			)}

			{state?.error && <p>{state?.error}</p>}
			<span
				className={`bg-red-100 text-red-700 ${
					state?.error ? 'visible' : 'hidden'
				}`}
				role='alert'>
				{state?.error}
			</span>
			{visible && (
				<ContextButton
					label='Save Document Settings'
					type='edit'
					onClick={(e) => e.target.form.requestSubmit()}
					classes='w-full mt-[2px]'
				/>
			)}
		</form>
	);
};

export default HeaderForm;
