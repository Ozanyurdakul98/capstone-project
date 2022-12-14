import { useState } from 'react';
import { useAsyncDebounce } from 'react-table';

export default function ServicesFilter({ setFilter }) {
  const [value, setValue] = useState('none');
  const onChange = useAsyncDebounce((value) => {
    setFilter('Service', value || undefined);
  }, 300);
  return (
    <div>
      <h2>Service:</h2>
      <select
        className="select-table"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}>
        <option value="none" hidden disabled>
          Select an Option
        </option>
        <option value="recording">Recording</option>
        <option value="mix">Mix</option>
        <option value="master">Master</option>
        <option value="musicProduction">Music Production</option>
        <option value="podcast & Audiobook">Podcast & Audiobook</option>
        <option value="rent Studio">Rent a Studio</option>
      </select>
    </div>
  );
}
