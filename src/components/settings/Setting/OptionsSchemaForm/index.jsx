'use client';
import { useState } from 'react';

// components
import ArrowSvg from '@/../public/arrow.svg';
import LanguageInputContainer from '@/components/inputs/LanguageInputContainer';
import ContextButton from '@/components/buttons/ContextButton';
import MainInput from './MainInput';
import AddCollections from './AddCollections';
import Collections from './Collections';

const OptionsSchema = ({ setting, languages }) => {
	const [visible, setVisible] = useState(
		setting.optionsSchema && setting.settings ? false : true
	);
	const [collections, setCollections] = useState([]);

	console.log(collections, 'the  collections');

	return (
		<form className='flex flex-col gap-1 bg-slate-100 border-[1px] border-slate-100 p-1 rounded'>
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
			{!visible && (
				<>
					<MainInput languages={languages} />
					<AddCollections
						languages={languages}
						setCollections={setCollections}
					/>
					<Collections collections={collections} />
				</>
			)}
		</form>
	);
};

export default OptionsSchema;
