import { useState } from 'react';

// state/actions
import { nameArray } from '@/utils/nameArray';

// components
import ContextButton from '@/components/buttons/ContextButton';
import SelectGroup from './SelectGroup';

const GroupParam = ({ setGroup, groups }) => {
  const [showOptions, setShowOptions] = useState(false);
  const handleGroup = () => {
    setShowOptions(!showOptions);
    setGroup(groups[0]);
  };

  let names = groups?.settings.map((setting) => ({
    id: setting._id,
    ...nameArray(setting.parameter.inputValue),
  }));
  return (
    <fieldset name='group-parameter'>
      {!showOptions ? (
        <ContextButton label='Group items' type='edit' onClick={handleGroup} />
      ) : (
        ''
      )}
      {showOptions ? (
        <SelectGroup
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          groups={names}
          setGroup={setGroup}
        />
      ) : (
        ''
      )}
    </fieldset>
  );
};

export default GroupParam;
