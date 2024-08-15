// state/actions
import { orderBySector } from '@/utils/orderBySector';

// components
import Ordered from './Ordered';

const PublishedSettings = ({ published }) => {
  const mutPublished = orderBySector(published) || [];
  return (
    <div className='flex flex-col gap-1'>
      <h2>Settings</h2>
      {mutPublished.map((setting) => (
        <Ordered key={setting.sector} setting={setting} />
      ))}
    </div>
  );
};

export default PublishedSettings;
