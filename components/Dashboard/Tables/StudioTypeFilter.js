import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export default function StudioTypeFilter({ preGlobalFilteredRows, state, setFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState('none');
  const onChange = useAsyncDebounce((value) => {
    setFilter('studiotype', value || undefined);
  }, 300);

  console.log('ty', value);
  console.log('tystate', state.filters);
  return (
    <div>
      <h2>Studio Type:</h2>
      <select
        className='select-table'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}>
        <option value='none' hidden disabled>
          Select an Option
        </option>
        <option value='Home Studio'>Home Studio</option>
        <option value='Medium Studio'>Medium Studio</option>
        <option value='Premium Studio'>Premium Studio</option>
      </select>
    </div>
  );
}
