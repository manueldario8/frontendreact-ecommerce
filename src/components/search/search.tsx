import "./search.css";

type SearchProps = {
  onSearch: (termino: string) => void;
};

const Search = ({ onSearch }: SearchProps) => {
  return (
    <section className="search">
      <input
        type="search"
        placeholder="Buscar"
        className="search-bar"
        onChange={(e) => onSearch(e.target.value)}
      />
    </section>
  );
};

export default Search;
