'use client';
import { useEffect, useState } from 'react';

// state/actions
import { saveOptionSchema } from '@/data-access/settings/saveOptionsSchema';

// components
import ArrowSvg from '@/../public/arrow.svg';
import MainInput from './MainInput';
import AddCollections from './AddCollections';
import Collections from './Collections';
import ContextButton from '@/components/buttons/ContextButton';
import ErrorMsg from '@/components/reusable/ErrorMsg';

const initState = {
	parameter: {
		name: {
			singular: {},
			plural: {},
		},
	},
	collections: [],
};

const OptionsSchema = ({ setting, initState: topState, languages }) => {
	const [state, setState] = useState(() => (!topState ? initState : topState));
	const [actionStatus, setActionStatus] = useState({
		error: null,
		success: null,
	});

	const [visible, setVisible] = useState(setting?.optionsSchema ? false : true);
	const [resetComponents, setResetComponents] = useState({
		submit: false,
		add: false,
		collections: false,
	});
	const [resetLanguage, setResetLanguage] = useState({
		submit: false,
		add: false,
		collections: false,
	});

	const handleCollectionsUpdate = (collections) => {
		setState((prev) => ({ ...prev, collections }));
	};

	const submit = async () => {
		const { error, success } = await saveOptionSchema(
			state,
			setting._id.toString()
		);
		setActionStatus({
			error: error || null,
			success: success || null,
		});
		setResetLanguage({
			submit: true,
			add: true,
			collections: true,
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
				className='group flex justify-between items-center w-full'>
				<h4>Option schema</h4>
				<ArrowSvg
					className={`w-[22px] h-[22px] m-1 fill-red-500 group-hover:fill-red-300 ${
						visible ? '' : 'rotate-180'
					}`}
				/>
			</button>
			{visible && (
				<>
					<MainInput
						languages={languages}
						error={actionStatus.error}
						state={state}
						setState={setState}
						reset={{
							resetData: resetComponents,
							setReset: setResetComponents,
							resetType: 'submit',
						}}
					/>

					<AddCollections
						languages={languages}
						setState={setState}
						setActionStatus={setActionStatus}
						reset={{
							resetData: resetComponents,
							setReset: setResetComponents,
							resetType: 'add',
						}}
					/>

					{actionStatus?.error?.collections && (
						<ErrorMsg msg={actionStatus?.error?.collections} />
					)}

					{!!state?.collections.length && (
						<Collections
							languages={languages}
							state={state}
							setState={setState}
							functions={{ handleCollectionsUpdate }}
							reset={{
								resetData: resetComponents,
								setReset: setResetComponents,
								resetType: 'add',
							}}
						/>
					)}
					<ContextButton
						label='Save Options Schema'
						type='edit'
						onClick={submit}
					/>
				</>
			)}
		</form>
	);
};

export default OptionsSchema;
