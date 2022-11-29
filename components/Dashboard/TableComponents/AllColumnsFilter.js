import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

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
        className="input-table"
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
