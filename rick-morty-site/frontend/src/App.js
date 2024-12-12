  import React, { useState } from "react";
  import FilterPanel from "./components/FilterPanel";
  import CharacterList from "./components/CharacterList";
  import Navbar from "./components/Navbar"; // Navbar import ediliyor

  function App() {
    const [filters, setFilters] = useState({
      name: '',
      status: '',
      gender: '',
      species: '',
      type: ''
    });
    const [sortCharacters, setSortCharacters] = useState(false);
  
    return (
      <div>
        <Navbar />
        <div style={{ display: 'flex' }}>
          <FilterPanel setFilters={setFilters} filters={filters} setSortCharacters={setSortCharacters} />
          <CharacterList filters={filters} setFilters={setFilters} sortCharacters={sortCharacters} />
        </div>
      </div>
    );
  }
  
  export default App;
  