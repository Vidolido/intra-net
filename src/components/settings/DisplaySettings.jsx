'use client';
import { useSettingsContext } from '@/state/settingsContext';
import { createRandomNumber } from '@/utils/functions';
import { getDisplayHeadings } from '@/utils/getDisplayHeadings';

const DisplaySettings = ({ languages }) => {
  const { settings, defaultLanguage } = useSettingsContext();

  let headings = getDisplayHeadings(settings[0]) || null;
  //   console.log(headings, 'the  headings');
  console.log(settings, 'THE SETTINGS');
  return (
    <div>
      <table className='border-collapse'>
        <thead>
          <tr>
            {headings.main && (
              <th className='border w-[150px] text-left pl-3'>
                {headings?.main[defaultLanguage.language]}
              </th>
            )}

            {headings.collections &&
              headings?.collections.map((collection, index) => (
                <th key={index} className='border w-[150px] text-left pl-3'>
                  {collection[defaultLanguage.language]}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {settings?.map((setting, index) => {
            let collections = setting.collections;

            return (
              <>
                <tr key={createRandomNumber(1, 999)}>
                  <td className='border text-left pl-3'>
                    {setting?.parameter?.value['en']} ova
                  </td>
                  {collections.map((item, ind) => {
                    return (
                      <td key={ind} className='border text-left pl-3'>
                        {item.collection.map((collection, i) => {
                          return <p key={i}>test</p>;
                        })}
                      </td>
                    );
                  })}
                  {/* <td className='border text-left pl-3'>
                  {setting?.parameter?.value['en']}
                </td> */}

                  {/* {collections?.map((collection) => {
                  return collection.collection.map((item, ind) => (
                    <td key={ind} className='border text-left pl-3'>
                      {(typeof item.value === 'string' && item.value) ||
                        item.value[defaultLanguage.language] ||
                        `${item?.value?.key} - ${item?.value?.value}`}
						</td>
					));
                })} */}
                </tr>
                <tr>
                  <td colSpan={4}>testiranje</td>
                </tr>
              </>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>

      {/* <table className='border-collapse'>
        <thead>
          <tr>
            <th className='border w-[150px] text-left pl-3'>Properties</th>
            <th className='border w-[150px] text-left pl-3'>Methods</th>
            <th className='border w-[150px] text-left pl-3'>Units</th>
            <th className='border w-[150px] text-left pl-3'>Limits</th>
          </tr>
          <tr></tr>
        </thead>
        <tbody>
          <tr>
            <td className='border text-left pl-3'>Density</td>
            <td className='border text-left pl-3'>
              <p>Iso 12128</p>
              <p>Iso 620</p>
            </td>
            <td className='border text-left pl-3'>
              <p>g/ml</p>
              <p>kg/l</p>
            </td>
            <td className='border text-left pl-3'>
              <p>0.7500 - 0.7650</p>
              <p>0.7500 - 0.7650</p>
              <p>Visual</p>
            </td>
          </tr>
          <tr>
            <td className='border text-left pl-3'>Distilation</td>
            <td className='border text-left pl-3'></td>
            <td className='border text-left pl-3'></td>
            <td className='border text-left pl-3'></td>
          </tr>
          <tr>
            <td className='border text-left pl-3'>Density</td>
            <td className='border text-left pl-3'>
              <p>Iso 620</p>
            </td>
            <td className='border text-left pl-3'>
              <p>kg/l</p>
            </td>
            <td className='border text-left pl-3'>
              <p>0.7650</p>
            </td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table> */}

      {/* {settings?.map((setting, index) => (
        <div key={createRandomNumber(1, 999)}>
          {setting.parameter.name.singular[defaultLanguage.language]}{' '}
          {setting?.collections?.map(
            (collection) => ' ' + collection.name[defaultLanguage.language]
          )}
        </div>
      ))} */}
    </div>
  );
};

export default DisplaySettings;
