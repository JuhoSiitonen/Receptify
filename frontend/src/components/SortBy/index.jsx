import { useState } from 'react';

const SortBy = ({ onSort }) => {
  const [sortOption, setSortOption] = useState('cookingTime');
  const [sortValue, setSortValue] = useState('ASC');

  const handleSorter = () => {
    onSort({ option: sortOption, value: sortValue });
  };

  return (
    <div>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="cookingTime">Cooking time</option>
        <option value="averageRating">Rating</option>
        <option value="createdAt">Created at</option>
      </select>
      <select
        value={sortValue}
        onChange={(e) => setSortValue(e.target.value)}
        >
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
      <button onClick={handleSorter}>Sort</button>
    </div>
  );
};


export default SortBy