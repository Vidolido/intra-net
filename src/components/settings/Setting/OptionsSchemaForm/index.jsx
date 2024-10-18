'use client';
import { useState } from 'react';

// state/actions
import { saveOptionSchema } from '@/data-access/settings/saveOptionsSchema';

// components
import ArrowSvg from '@/../public/arrow.svg';
import MainInput from './MainInput';
import AddCollections from './AddCollections';
import Collections from './Collections';
import ContextButton from '@/components/buttons/ContextButton';

const initState = {
	parameter: {
		name: {
			singular: {},
			plural: {},
		},
	},
	collections: [],
};

const OptionsSchema = ({ setting, languages }) => {
	const [state, setState] = useState(() =>
		!setting.optionsSchema ? initState : setting.optionsSchema
	);
	const [actionStatus, setActionStatus] = useState({
		error: null,
		success: null,
	});

	const [visible, setVisible] = useState(setting?.optionsSchema ? false : true);

	const submit = async () => {
		const { error, success } = await saveOptionSchema(
			state,
			setting._id.toString()
		);
		setActionStatus({
			error: error || null,
			success: success || null,
		});
	};
	return (
		<form className='flex flex-col gap-1 bg-slate-100 border-[1px] border-slate-100 p-1 rounded'>
			<input
				type='text'
				className='hidden'
				defaultValue={setting._id}
				name='document_id'
			/>
			<button
				type='button'
				onClick={() => setVisible(!visible)}
				className='relative w-full'>
				<h4 className='text-left'>Option schema</h4>
				<ArrowSvg
					className={`w-[22px] h-[22px] absolute right-1 top-[3px] fill-red-500 hover:fill-red-300 ${
						visible ? '' : 'rotate-180'
					}`}
				/>
			</button>
			{visible && (
				<>
					<MainInput
						setting={setting}
						languages={languages}
						error={actionStatus.error}
						state={state}
						setState={setState}
					/>

					<AddCollections
						languages={languages}
						setState={setState}
						setActionStatus={setActionStatus}
					/>
					<span
						className={`bg-red-100 text-red-700 ml-1 ${
							actionStatus?.error?.collections ? 'visible' : 'hidden'
						}`}
						role='alert'>
						{actionStatus?.error?.collections}
					</span>

					{!!state?.collections.length && (
						<Collections
							languages={languages}
							setState={setState}
							collections={state.collections}
						/>
					)}
				</>
			)}
			<ContextButton label='Save Options Schema' type='edit' onClick={submit} />
		</form>
	);
};

export default OptionsSchema;
