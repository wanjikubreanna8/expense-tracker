function SearchBar({ searchTerm, setSearchTerm }) {
    return (
      <div className="search-container">
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    );
  }
  
  export default SearchBar;