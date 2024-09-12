'use client';

// state/actions
import { ADD } from '@/state/actionTypes';
import {
	useEditSettingsContext,
	useEditSettingsDispatchContext,
} from '@/state/settings/editSetting/editSettingsState';

// components
import NameEdit from './NameEdit';
import ParamValue from './ParamValue';

const EditMain = ({ languages, parameter }) => {
	const { checkedName } = useEditSettingsContext();
	const dispatch = useEditSettingsDispatchContext();
	const defaultLanguage = {
		_id: '6656eed3b12adae590481cfe',
		language: 'en',
		locale: 'en-US',
	};

	let checkBoxFields = Object.keys(parameter?.name).reduce(
		(acc, currentValue) => {
			acc.push(currentValue);
			return acc;
		},
		[]
	);

	const handleRadioButton = (e) => {
		dispatch({
			type: ADD,
			payload: {
				state: 'checkedName',
				value: e.target.value,
			},
		});
	};

	return (
		<fieldset name='main-parameter'>
			{checkBoxFields.map((field) => (
				<label key={field}>
					<input
						type='radio'
						name='name'
						checked={checkedName === field ? 'checked' : ''}
						value={field}
						onChange={handleRadioButton}
					/>{' '}
					<span>{field}</span>
				</label>
			))}
			{checkedName === 'singular' ? (
				<NameEdit
					languages={languages}
					defaultLanguage={defaultLanguage}
					value={parameter.name.singular}
				/>
			) : (
				''
			)}
			{checkedName === 'plural' ? (
				<NameEdit
					languages={languages}
					defaultLanguage={defaultLanguage}
					value={parameter.name.plural}
				/>
			) : (
				''
			)}
			<ParamValue value={parameter.inputValue} languages={languages} />
		</fieldset>
	);
};

export default EditMain;
