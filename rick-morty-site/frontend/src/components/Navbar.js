import React from "react";

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex', // İçeriği yatay olarak hizalar
      alignItems: 'center', // Dikey hizalamayı ortalar
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px 20px',
      fontSize: '24px',
      fontWeight: 'bold'
    }}>
      <img 
        src="https://pngimg.com/d/rick_morty_PNG17.png" 
        alt="Logo" 
        style={{
          height: '40px', // Resim yüksekliği
          marginRight: '10px' // Yazı ile arasına boşluk ekler
        }}
      />
      Rick & Morty Characters
    </nav>
  );
};

export default Navbar;
