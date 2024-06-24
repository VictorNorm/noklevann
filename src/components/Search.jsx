import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
      const later = () => {
          clearTimeout(timeout);
          func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
  };
}

function Search() {
  const [results, setResults] = useState([]);
  const [categorizedResults, setCategorizedResults] = useState({});
  const searchContainerRef = useRef(null);

  const groupByCategory = (results) => {
    return results.reduce((acc, item) => {
      const category = item._type;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  };

  useEffect(() => {
    setCategorizedResults(groupByCategory(results));
  }, [results]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setResults([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function performSearch(event) {

    const userInput = event.target.value;
    if(userInput === "") {
      setResults([]);
      return;
    }
    console.log(userInput)
    const pattern = `${userInput}*`;
    const query = encodeURIComponent(`*[_type in ["praktisk", "nyheter"] && (title match "${pattern}")] { _id, title, _type, "fileUrl": file.asset->url}`);
    
  const url = `https://39o8vvzc.api.sanity.io/v2024-03-19/data/query/production?query=${query}`;
  
  try {
    const response = await fetch(url);
    const result = await response.json();
    console.log(result.result)
    console.log(event.target.value)
    setResults(result.result);
   
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
  };

  const debouncedSearch = debounce(performSearch, 500);

  const hasResults = Object.keys(categorizedResults).length > 0;

  return (
<div className='searchContainer' ref={searchContainerRef}>
  <div className='searchContainer__search'>
    <input type="search" name="search" id="search" onKeyUp={debouncedSearch} autoComplete='off'/>
    <label htmlFor="search"><FaSearch /></label>
  </div>
  {hasResults && (
    <section className='searchContainer__results'>
      {Object.entries(categorizedResults).map(([category, items]) => (
        <div key={category}>
          <h2>
            {category === 'praktisk' ? 'Dokument' : category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <ul className='searchContainer__ul'>
            {items.map(item => (
              <li key={item._id}>
                {item._type === 'nyheter' ? (
                  <a href={`/nyhet?id=${item._id}`} style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>
                    {item.title}
                  </a>
                ) : item.fileUrl ? (
                  <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'block', color: 'inherit', textDecoration: 'none' }}>
                    {item.title}
                  </a>
                ) : (
                  <span>{item.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )}
</div>

  );
}

export default Search;
