'use client';
import { Suspense, useState } from 'react';

// state/actions
import { formatDate } from '@/utils/formatDate';

// components
import Labels from './Labels';
import SingleDateCollection from './SingleDateCollection';
import ShowHideButton from '@/components/reusable/ShowHideButton';

const DateCollections = ({ collection, templateSettings }) => {
	const [visible, setVisible] = useState(true);

	const { date } = formatDate(collection?.date);

	const handleHide = () => {
		setVisible(!visible);
	};

	return (
		<div>
			<ShowHideButton heading={date} visible={visible} onClick={handleHide} />
			<div className={` ${!visible ? 'hidden' : 'visible'}`}>
				{collection?.date && (
					<Labels classes={'grid-cols-5'} dateTime={false} time={true} />
				)}
				{collection && (
					<SingleDateCollection
						collection={collection}
						templateSettings={templateSettings}
					/>
				)}
			</div>
		</div>
	);
};

export default DateCollections;
