/* eslint-disable react/prop-types */

function TodosViewForm({
  sortDirection,
  sortField,
  setSortDirection,
  setSortField,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={preventRefresh}>
        <div>
          <label htmlFor="">Search todos:</label>
          <input
            type="text"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
          />
          <button type="button" onClick={() => setQueryString('')}>
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
