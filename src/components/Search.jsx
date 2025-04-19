const Search = ({ search, setSearch }) => {
    return (
      <div className="mb-6">
        <input
          type="text"
          placeholder="Bitcoin, Ethereum..."
          className="input input-bordered w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    );
  };
  
  export default Search;
  