function App() {
  const [filters, setFilters] = useState({
    name: '',
    status: '',
    gender: '',
    species: '',
    type: ''
  });

  return (
    <div style={{ display: 'flex' }}>
      <FilterPanel setFilters={setFilters} filters={filters} />
      <CharacterList filters={filters} />
    </div>
  );
}

export default App;