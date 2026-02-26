/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
    <StyledTodosView>
      <form onSubmit={preventRefresh}>
        <div className="search-container">
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
    </StyledTodosView>
  );
}

const StyledTodosView = styled.div`
  display: flex;
  justify-content: center;
  form {
    width: 75%;
  }

  .search-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0 8px;
    margin-bottom: 8px;
  }

  .search-container label {
    margin: 0;
  }

  .search-container input {
    flex-grow: 2;
    border-radius: 5px;
  }

  .search-container button {
    border-radius: 5px;
    color: #e0e1dd;
    font-weight: bold;
    background-color: #e08d79;
  }

  label {
    font-weight: bold;
    margin-right: 4px;
  }

  select {
    border-radius: 5px;
    padding: 4px 8px;
    background-color: #778da9;
    border: none;
    color: #e0e1dd;
    font-weight: bold;
    margin-right: 16px;
  }
`;

export default TodosViewForm;
