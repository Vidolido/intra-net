// state/actions
import { generateUUID } from '@/utils/generateUUID';

// components
import ContextButton from '@/components/buttons/ContextButton';
import SelectInput from '@/components/inputs/SelectInput';

const groups = [
	{
		id: generateUUID(),
		name: {
			en: 'Distilation',
			mk: 'Дестилација',
		},
		type: 'grouped-parameter',
	},
	{
		id: generateUUID(),
		name: {
			en: 'Recovered',
			mk: '',
		},
		type: 'grouped-parameter',
	},
];

const SelectGroup = ({ showOptions, setShowOptions }) => {
	return (
		<label>
			<SelectInput />
			<ContextButton
				label='cancel'
				type='default'
				onClick={() => setShowOptions(false)}
			/>
			<ContextButton label='End group' type='edit' />
		</label>
	);
};

export default SelectGroup;
