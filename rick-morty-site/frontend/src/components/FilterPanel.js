import React, { useState } from "react";

const FilterPanel = ({ setFilters, filters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: prevFilters[name] === value ? '' : value
    }));
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div>
      {/* Toggle Button */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            top: '60px',  // Navbar'ın hemen altında başlar
            left: 0,
            transform: 'translateY(0%)',
            backgroundColor: '#f0f0f0',
            padding: '15px',
            fontWeight: 'bold',
            textAlign: 'center',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            borderTopRightRadius: '5px',
            borderBottomRightRadius: '5px',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
            cursor: 'pointer',
          }}
        >
          Filters
        </div>
      )}

      {/* Filter Panel */}
      {isOpen && (
        <div
          style={{
            position: 'relative',
            left: 0,
            height: '100%',
            width: '300px',
            backgroundColor: '#f4f4f9',
            padding: '20px',
            boxSizing: 'border-box',
            overflowY: 'auto',
            boxShadow: '2px 0px 10px rgba(0,0,0,0.3)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              fontWeight: 'bold',
              cursor: 'pointer',
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
          >
            ✖
          </button>

          <h3>Filter Characters</h3>

          {/* Filter by Character Name */}
          <input
            placeholder="Character Name"
            name="name"
            onChange={handleInputChange}
            style={{
              padding: '10px',
              width: '100%',
              borderRadius: '5px',
              fontSize: '16px',
              boxSizing: 'border-box',
              marginBottom: '10px',
            }}
          />

{/* Filter by Status */}
<div style={{ marginTop: '15px' }}>
  <h4>Status</h4>
  <select 
    name="status" 
    onChange={handleDropdownChange} 
    value={filters.status}
    style={{
      padding: '10px',
      width: '100%',
      borderRadius: '5px',
      fontSize: '16px',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
      transition: '0.2s',
    }}
    onFocus={(e) => e.target.style.borderColor = '#666'}
    onBlur={(e) => e.target.style.borderColor = '#ccc'}
  >
    <option value="">Select Status</option>
    {['Alive', 'Dead', 'unknown'].map((status) => (
      <option key={status} value={status}>
        {status}
      </option>
    ))}
  </select>
</div>

{/* Filter by Gender */}
<div style={{ marginTop: '15px' }}>
  <h4>Gender</h4>
  <select 
    name="gender" 
    onChange={handleDropdownChange} 
    value={filters.gender}
    style={{
      padding: '10px',
      width: '100%',
      borderRadius: '5px',
      fontSize: '16px',
      boxSizing: 'border-box',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
      transition: '0.2s',
    }}
    onFocus={(e) => e.target.style.borderColor = '#666'}
    onBlur={(e) => e.target.style.borderColor = '#ccc'}
  >
    <option value="">Select Gender</option>
    {['Female', 'Male', 'Genderless', 'unknown'].map((gender) => (
      <option key={gender} value={gender}>
        {gender}
      </option>
    ))}
  </select>
</div>

      {/* Filter by Species */}
      <div style={{ marginTop: '15px' }}>
        <h4>Species</h4>
        <select 
          name="species" 
          onChange={handleDropdownChange} 
          value={filters.species}
          style={{
            padding: '10px',
            width: '100%',
            borderRadius: '5px',
            fontSize: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
            transition: '0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = '#666'}
          onBlur={(e) => e.target.style.borderColor = '#ccc'}
        >
          <option value="">Select Species</option>
          {['Human', 'Alien', 'Robot', 'Unknown'].map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>
      </div>

        </div>
      )}
    </div>
  );
};

export default FilterPanel;


