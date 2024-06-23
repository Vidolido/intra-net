'use client';
import { useEffect } from 'react';

// state/actions
import { ADD } from '@/state/actionTypes';
import { useEditSettingsDispatchContext } from '@/state/settings/editSetting/editSettingsState';

const Wrapper = ({ children, options, settings }) => {
	const dispatch = useEditSettingsDispatchContext();
	console.log(settings, 'in wrapper');
	useEffect(() => {
		dispatch({
			type: ADD,
			payload: {
				state: 'options',
				value: options,
			},
		});
		dispatch({
			type: ADD,
			payload: {
				state: 'settings',
				value: settings,
			},
		});
	});
	return <>{children}</>;
};

export default Wrapper;
