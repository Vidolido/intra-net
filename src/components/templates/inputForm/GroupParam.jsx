import { useState } from 'react';

// state/actions
import { generateUUID } from '@/utils/generateUUID';
import { nameArray } from '@/utils/nameArray';

// components
import ContextButton from '@/components/buttons/ContextButton';
import SelectInput from '@/components/inputs/SelectInput';
import SelectGroup from './SelectGroup';

// const groups = [
//   {
//     id: generateUUID(),
//     name: {
//       en: 'Distilation',
//       mk: 'Дестилација',
//     },
//     type: 'grouped-parameter',
//   },
//   {
//     id: generateUUID(),
//     name: {
//       en: 'Recovered',
//       mk: '',
//     },
//     type: 'grouped-parameter',
//   },
// ];

const GroupParam = ({ selected, setGroup, groups }) => {
  // console.log(selected, 'selected');
  const [showOptions, setShowOptions] = useState(false);
  const handleGroup = () => {
    setShowOptions(!showOptions);
    setGroup(groups[0]);
  };

  //   console.log(groups.settings, 'ovija gi gledam');
  let names = groups?.settings.map((setting) => ({
    id: setting._id,
    ...nameArray(setting.parameter.inputValue),
  }));
  console.log(names, 'the names');
  //   console.log(groups, 'the groups');
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
