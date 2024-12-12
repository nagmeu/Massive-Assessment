const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const API_URL = 'https://rickandmortyapi.com/api';

app.get('/api/characters', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/character`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get characters' });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
