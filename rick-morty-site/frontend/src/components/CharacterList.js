import React, { useEffect, useState } from "react";
import axios from "axios";

const CharacterList = ({ filters, setFilters }) => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [info, setInfo] = useState({ pages: 0 });
  const [noCharactersAlert, setNoCharactersAlert] = useState(false);
  const [sortOrder, setSortOrder] = useState('');
  const [charactersPerPage, setCharactersPerPage] = useState(25);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getCharacters = async () => {
    try {
      let allCharacters = [];
      let page = 1;

      while (true) {
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);

        if (!data.results) break;

        allCharacters = allCharacters.concat(data.results);

        if (page >= data.info.pages) break;
        page++;
      }

      setCharacters(allCharacters);
      setCurrentPage(0);
    } catch (err) {
      console.error('API call error:', err);
    }
  };

  const sortedCharacters = () => {
    let filteredList = characters.filter((char) => {
      return (
        (!filters.status || char.status === filters.status) &&
        (!filters.gender || char.gender === filters.gender) &&
        (!filters.species || char.species.toLowerCase().includes(filters.species.toLowerCase())) &&
        (!filters.type || char.type.toLowerCase().includes(filters.type.toLowerCase())) &&
        (!filters.name || char.name.toLowerCase().includes(filters.name.toLowerCase()))
      );
    });

    if (sortOrder === 'asc') {
      filteredList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      filteredList.sort((a, b) => b.name.localeCompare(a.name));
    }

    return filteredList;
  };

  const totalPages = Math.ceil(sortedCharacters().length / charactersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageSelect = (e) => {
    setCurrentPage(Number(e.target.value) - 1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCharactersPerPageChange = (e) => {
    setCharactersPerPage(Number(e.target.value));
    setCurrentPage(0);
  };

  const indexOfFirstCharacter = currentPage * charactersPerPage;
  const indexOfLastCharacter = indexOfFirstCharacter + charactersPerPage;

  const currentCharacters = sortedCharacters().slice(indexOfFirstCharacter, indexOfLastCharacter);

  const openModal = async (character) => {
    try {
      let firstSeenEpisodeName = '';
      let lastSeenEpisodeName = '-';
  
      // Get the first seen episode name
      if (character.episode && character.episode.length > 0) {
        const firstEpisodeResponse = await axios.get(character.episode[0]);
        firstSeenEpisodeName = firstEpisodeResponse.data.name;
  
        // Get the last seen episode name or set it to "-"
        const lastEpisodeResponse = await axios.get(character.episode[character.episode.length - 1]);
        lastSeenEpisodeName = lastEpisodeResponse.data.name;
      }
  
      setSelectedCharacter({
        ...character,
        location: character.location.name,
        firstSeenEpisode: firstSeenEpisodeName,
        lastSeenEpisode: lastSeenEpisodeName,
      });
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching episode data:", error);
      setSelectedCharacter({
        ...character,
        location: character.location.name,
        firstSeenEpisode: '-',
        lastSeenEpisode: '-',
      });
      setModalVisible(true);
    }
  };
  
  const closeModal = () => {
    setModalVisible(false);
    setSelectedCharacter(null);
  };

  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    setCurrentPage(0); // Reset to the first page when filters are applied

    if (sortedCharacters().length === 0 && hasFiltersActive() && !noCharactersAlert) {
      window.alert("No characters found matching the filters!");

      setNoCharactersAlert(true);

      setFilters({
        status: '',
        gender: '',
        species: '',
        type: '',
        name: ''
      });

      getCharacters();
    } else if (sortedCharacters().length > 0) {
      setNoCharactersAlert(false);
    }
  }, [filters, charactersPerPage, sortOrder]);

  const hasFiltersActive = () => {
    return Object.values(filters).some(value => value);
  };

  return (
    <div>
      {/* Controls for Sorting and Characters Per Page */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <label>Characters per Page: </label>
          <select onChange={handleCharactersPerPageChange} value={charactersPerPage} style={{ padding: '10px', marginLeft: '10px' }}>
            {[5, 10, 15, 20, 25, 30].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label>Sort By: </label>
          <select onChange={handleSortChange} value={sortOrder} style={{ padding: '10px', marginLeft: '10px' }}>
            <option value="">None</option>
            <option value="asc">Name A-Z</option>
            <option value="desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Character Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', padding: '20px' }}>
        {currentCharacters.map((char) => (
          <div key={char.id} style={{ padding: '15px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '10px' }}
               onClick={() => openModal(char)}>
            <img src={char.image} alt={char.name} style={{ width: '100%', height: 'auto' }} />
            <p>{char.name}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', alignItems: 'center' }}>
        <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0} style={{ padding: '10px' }}>
          First
        </button>
        <button onClick={handlePreviousPage} disabled={currentPage === 0} style={{ padding: '10px' }}>
          Previous
        </button>
        <select onChange={handlePageSelect} value={currentPage + 1} style={{ marginLeft: '10px', padding: '10px' }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
        <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1} style={{ padding: '10px', marginLeft: '10px' }}>
          Next
        </button>
        <button onClick={() => setCurrentPage(totalPages - 1)} disabled={currentPage >= totalPages - 1} style={{ padding: '10px' }}>
          Last
        </button>

        <span style={{ marginLeft: '20px', fontWeight: 'bold' }}>Page {currentPage + 1} of {totalPages}</span>
      </div>

        {/* Modal Overlay */}
        {modalVisible && selectedCharacter && (
          <div onClick={closeModal} style={{ position: 'fixed', top: 0, left: 0, background: 'rgba(0,0,0,0.7)', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div onClick={e => e.stopPropagation()} style={{ position: 'relative', padding: '20px', background: 'white', maxWidth: '300px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <button 
                onClick={closeModal} 
                style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '1.5em', 
                  cursor: 'pointer', 
                  color: '#333' 
                }}
                aria-label="Close"
              >
                &times;
              </button>
              <img src={selectedCharacter.image} alt={selectedCharacter.name} style={{ width: '100%' }} />
              <p style={{ fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center' }}>{selectedCharacter.name}</p>
              <p><span style={{ fontWeight: 'bold' }}>Status:</span> {selectedCharacter.status}</p>
              <p><span style={{ fontWeight: 'bold' }}>Species:</span> {selectedCharacter.species}</p>
              <p><span style={{ fontWeight: 'bold' }}>Gender:</span> {selectedCharacter.gender}</p>
              <p><span style={{ fontWeight: 'bold' }}>Location:</span> {selectedCharacter.location}</p>
              <p><span style={{ fontWeight: 'bold' }}>First Seen In:</span> {selectedCharacter.firstSeenEpisode}</p>
              <p><span style={{ fontWeight: 'bold' }}>Last Seen In:</span> {selectedCharacter.lastSeenEpisode}</p>
            </div>
          </div>
        )}



      <div style={{
        backgroundColor: '#222',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        <p style={{ margin: 0 }}>
          Massive Bioinformatics Uzun Dönem Staj / Front-End Assessment
        </p>
        <p style={{ margin: 0 }}>
          Nağme Uğurtan
          <br />
        </p>
        <p style={{ margin: 0 }}>
          <a
            href="https://www.linkedin.com/in/nağme-uğurtan/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#FFFFFF', textDecoration: 'none' }}
          >
            https://www.linkedin.com/in/nağme-uğurtan/
          </a>
          <br />
          <a
            href="https://github.com/nagmeu"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#FFFFFF', textDecoration: 'none' }}
          >
            https://github.com/nagmeu
          </a>
        </p>
      </div>
    </div>
  );
};

export default CharacterList;
