/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

function TodosViewForm({
  sortDirection,
  sortField,
  setSortDirection,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);
  const preventRefresh = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const debaunce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debaunce);
  }, [localQueryString, setLocalQueryString]);
  return (
    <div>
      <form onSubmit={preventRefresh}>
        <div>
          <label htmlFor="">Search todos:</label>
          <input
            type="text"
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)}
          />
          <button type="button" onClick={() => setLocalQueryString('')}>
            Clear
          </button>
        </div>
        <label htmlFor="sortBy">Sort by:</label>
        <select
          name="Sort by"
          id="sortBy"
          onChange={(e) => setSortField(e.target.value)}
          value={sortField}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time Added</option>
        </select>
        <label htmlFor="direction">Direction</label>
        <select
          name="Direction"
          id="direction"
          onChange={(e) => setSortDirection(e.target.value)}
          value={sortDirection}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </form>
    </div>
  );
}

export default TodosViewForm;
