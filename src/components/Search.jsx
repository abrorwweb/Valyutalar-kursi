const Search = ({ search, setSearch }) => {
    return (
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="input  input-bordered w-full mt-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    );
  };
  
  export default Search;
  