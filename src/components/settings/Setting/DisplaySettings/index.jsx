'use client';

// state/actions
import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { generateGridTemplate } from '@/utils/functions';

// components
import Headings from './Headings';
import SettingRow from './SettingRow';
import { memo, useCallback, useState } from 'react';

const DisplaySettings = ({
  defaultLanguage,
  languages,
  documentId,
  settings,
  optionsForSettings,
}) => {
  const [options, setOptions] = useState(optionsForSettings || []);
  let headings =
    (settings && getDisplayHeadings(settings[0], 'singular')) || null;

  let colNo = headings?.collections.length;
  let gridTemplateColumns = generateGridTemplate(colNo + 1);
  let classes = 'grid border';
  let editClass = `col-span-${colNo + 1}`;

  const handleOptions = useCallback(
    (settingId) => {
      const newOptions = options.map((option) => {
        if (option._id === settingId) {
          return {
            ...option,
            showOptions: !option.showOptions,
          };
        } else {
          return {
            ...option,
            showOptions: false,
            options: {
              expand: false,
              edit: false,
            },
          };
        }
      });
      setOptions(newOptions);
    },
    [options]
  );

  const handleExpand = useCallback(
    (settingId) => {
      let newOptions = [...options];
      let setting = newOptions.find((opt) => opt._id === settingId);
      setting.options.expand = !setting.options.expand;
      setOptions((prev) => {
        let newOptions = [...prev];
        let setting = newOptions.find((opt) => opt._id === settingId);
        setting.options.expand = !setting.options.expand;
        return [...newOptions];
      });
    },
    [options]
  );
  const handleEdit = useCallback(
    (settingId) => {
      let newOptions = [...options];
      let setting = newOptions.find((opt) => opt._id === settingId);
      setting.options.edit = !setting.options.edit;
      setOptions((prev) => {
        let newOptions = [...prev];
        let setting = newOptions.find((opt) => opt._id === settingId);
        setting.options.edit = !setting.options.edit;
        return [...newOptions];
      });
    },
    [options]
  );

  // console.log(settings, 'settings');
  console.log(options, 'options');

  // console.log(optionsForSettings, 'optionsForSettings');
  return (
    <div>
      <Headings
        defaultLanguage={defaultLanguage}
        headings={headings}
        classes={classes}
        gridTemplateColumns={gridTemplateColumns}
      />

      {settings &&
        settings.map((setting) => {
          return (
            <SettingRow
              key={setting._id}
              defaultLanguage={defaultLanguage}
              languages={languages}
              documentId={documentId}
              setting={setting}
              option={options.find((option) => option._id === setting._id)}
              handleOptions={handleOptions}
              handleExpand={handleExpand}
              handleEdit={handleEdit}
              classes={classes + ' hover:border-b-red-400'}
              editClass={editClass}
              gridTemplateColumns={gridTemplateColumns}
            />
          );
        })}
    </div>
  );
};

export default memo(DisplaySettings);
