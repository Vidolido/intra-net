'use client';

// state/actions
import { getDisplayHeadings } from '@/utils/getDisplayHeadings';
import { generateGridTemplate } from '@/utils/functions';

// components
import Headings from './Headings';
import SettingRow from './SettingRow';

const DisplaySettings = ({
  defaultLanguage,
  languages,
  settingId,
  settings,
}) => {
  let headings =
    (settings && getDisplayHeadings(settings[0], 'singular')) || null;

  let colNo = headings?.collections.length;
  let gridTemplateColumns = generateGridTemplate(colNo + 1);
  let classes = 'grid border';

  return (
    <div>
      <Headings
        defaultLanguage={defaultLanguage}
        headings={headings}
        classes={classes}
        gridTemplateColumns={gridTemplateColumns}
      />

      {settings &&
        settings.map((setting) => (
          <SettingRow
            key={setting._id}
            defaultLanguage={defaultLanguage}
            languages={languages}
            settingId={settingId}
            setting={setting}
            classes={classes + ' hover:border-b-red-400'}
            gridTemplateColumns={gridTemplateColumns}
          />
        ))}
    </div>
  );
};

export default DisplaySettings;
