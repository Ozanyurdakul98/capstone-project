import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

// const SearchContainer = tw.div`
//   mb-6
//   mt-6
//   flex
//   items-center
// `;

// const SearchText = tw.h2`
//   text-xl
// text-gray-600
//   mr-6
// `;

// const Input = tw.input`
//   h-8
//   border-2
//   border-solid
//   border-green-500
//   outline-none
//   p-4
//   rounded-lg
// `;

export default function AllColumnsFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter, tableName }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);
  return (
    <div>
      <h2>Search:</h2>
      <input
        className='input-table'
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} ${tableName}...`}
      />
    </div>
  );
}
