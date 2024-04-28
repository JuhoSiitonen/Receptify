import { useState } from 'react';

const Filter = ({ onFilter }) => {
  const [filterOption, setFilterOption] = useState('title');
  const [filterValue, setFilterValue] = useState('');

  const handleFilter = () => {
    onFilter({ option: filterOption, value: filterValue });
  };

  return (
    <div>
      <select
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
      >
        <option value="title">Title</option>
        <option value="username">Username</option>
        <option value="ingredients">Ingredients</option>
        <option value="categories">Categories</option>
      </select>
      <input
        type="text"
        placeholder={`Filter by ${filterOption}`}
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};


export default Filter