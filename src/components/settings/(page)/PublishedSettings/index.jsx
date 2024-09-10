// state/actions
import { orderBySector } from '@/utils/orderBySector';

// components
import Ordered from './Ordered';

const PublishedSettings = ({ sectors, published }) => {
  console.log(sectors, 'the sectors');
  const mutPublished = orderBySector(sectors, published) || [];
  return (
    <div className='flex flex-col gap-1'>
      <h2>Settings</h2>
      {mutPublished.map((sectorSettings, i) => (
        <Ordered key={i} setting={sectorSettings} />
      ))}
    </div>
  );
};

export default PublishedSettings;
