import React, { useState, useEffect } from 'react';
import Heading from "../components/Heading"
import { norwegianDate } from '../functions/norwegianDate';
import { newsTrimmer } from '../functions/newsTrimmer';
import { FaFile } from "react-icons/fa";
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

function Hjem() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = encodeURIComponent(`*[_type == "nyheter"]`);
      const url = `https://39o8vvzc.api.sanity.io/v2024-03-19/data/query/production?query=${query}`;
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        
        setNews(result.result);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <SEO title="Hjem" />
      <h2 id='nyheter'>Nyheter</h2>
      <div className='nyheter'>
        {news.map((post) => (
          <Link className='nyhet' key={post._id} to={`/nyhet?id=${post._id}`}>
            <section className='nyhet__header'>
              <h3>
                {post.title}
                {post.file?.asset?._ref && <FaFile />}
              </h3>
              <p className='nyhet__header__date'>{norwegianDate(post._createdAt)}</p>
            </section>
            <section className='nyhet__text'>
              {newsTrimmer(post.nyhet)}
            </section>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hjem