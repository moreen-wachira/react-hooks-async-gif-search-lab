// GifListContainer.js
import React, { useState, useEffect } from 'react';
import GifList from './GifList';
import GifSearch from './GifSearch';

const GifListContainer = () => {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/gifs?q=${searchTerm}`
        );
        const data = await response.json();
        setGifs(data.slice(0, 3)); // Store the first 3 gifs in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data when the component mounts or when the search term changes
    fetchData();
  }, [searchTerm]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <GifSearch onSearch={handleSearch} />
      <GifList gifs={gifs} />
    </div>
  );
};

export default GifListContainer;