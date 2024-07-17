// components
import Labels from './Labels';
import SingleDateCollection from './SingleDateCollection';

const DateCollections = ({ collection }) => {
  return (
    <div>
      <h4>{collection?.date}</h4>
      <Labels />
      <SingleDateCollection collection={collection} />
    </div>
  );
};

export default DateCollections;
