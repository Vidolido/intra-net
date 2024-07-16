import SindleDateCollection from './SindleDateCollection';

const DateCollections = ({ collection }) => {
	return (
		<div>
			<h4>{collection?.date}</h4>

			<SindleDateCollection collection={collection} />
		</div>
	);
};

export default DateCollections;
