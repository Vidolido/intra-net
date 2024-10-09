'use client';

import {
  TEMPLATE_COLUMNS_SHOW,
  TEMPLATE_COLUMNS_HIDE,
} from '@/state/laboratory/documents/singleDocument/actionTypes';
import {
  useSingleDocumentContext,
  useSingleDocumentDispatchContext,
} from '@/state/laboratory/documents/singleDocument/singleDocumentContext';

const getDisplayHeadings = (setting) => ({
  collections: setting?.collections?.map((setting) => ({
    _id: setting._id,
    name: setting.name,
  })),
});

const SideBar = ({ document, laboratorySettings }) => {
  const { template } = useSingleDocumentContext();
  const dispatch = useSingleDocumentDispatchContext();

  let headings =
    (laboratorySettings && getDisplayHeadings(laboratorySettings[0])) || null;

  // const collections = Object.keys(document.template[0].items).reduce(
  //   (acc, curentValue) => {},
  //   {}
  // );

  // console.log(headings, 'headings');
  const handleShowHide = (e) => {
    const { checked, value } = e.target;
    checked
      ? dispatch({ type: TEMPLATE_COLUMNS_SHOW, payload: value })
      : dispatch({ type: TEMPLATE_COLUMNS_HIDE, payload: value });
  };

  // console.log(template, 'the template from state');

  return (
    <div className='min-w-44 h-full bg-slate-200'>
      <h6>Show / Hide</h6>
      <div className='grid grid-cols-2 w-fit'>
        {headings &&
          Object.values(headings).map((values) => {
            if (Array.isArray(values)) {
              return values.map((value) => (
                <label
                  key={value._id}
                  className='block border-b border-slate-200 cursor-pointer hover:border-red-300 m-1'>
                  <input
                    type='checkbox'
                    value={value._id}
                    onChange={handleShowHide}
                  />
                  <span className='ml-2'>{value.name['en']}</span>
                </label>
              ));
            }
          })}
      </div>
    </div>
  );
};

export default SideBar;
