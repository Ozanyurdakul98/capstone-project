import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export default function ServicesFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);
  console.log(globalFilter);
  console.log(value);
  return (
    <div>
      <h2>Services:</h2>
      <select
        className='select-table'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}>
        <option value='recording'>Recording</option>
        <option value='mix'>Mix</option>
        <option value='master'>Master</option>
        <option value='musicProduction'>Music Production</option>
        <option value='podcast & Audiobook'>Podcast & Audiobook</option>
        <option value='rent Studio'>Rent a Studio</option>
      </select>
    </div>
  );
}
