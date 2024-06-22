'use client';
import { useEffect } from 'react';

// state/actions
import { ADD } from '@/state/actionTypes';
import { useEditSettingsDispatchContext } from '@/state/settings/editSetting/editSettingsState';

const Wrapper = ({ children, options }) => {
	const dispatch = useEditSettingsDispatchContext();
	useEffect(() => {
		dispatch({
			type: ADD,
			payload: {
				state: 'options',
				value: options,
			},
		});
	});
	return <>{children}</>;
};

export default Wrapper;
