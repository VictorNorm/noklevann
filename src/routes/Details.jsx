import React, { useState, useEffect } from 'react';
import Heading from '../components/Heading';
import { divideTextIntoSections } from '../functions/divideTextIntoSections';
import { norwegianDate } from '../functions/norwegianDate';
import { handlePdf } from '../functions/handlePdf';

function Details() {
  const [news, setNews] = useState(null);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const postId = urlParams.get('id');

  useEffect(() => {
    const fetchData = async () => {
      const query = encodeURIComponent(`*[_type == "nyheter" && _id == "${postId}"]{
        _id,
        title,
        nyhet,
        _createdAt,
        "fileUrl": file.asset->url
      }`);
      const url = `https://39o8vvzc.api.sanity.io/v2024-03-19/data/query/production?query=${query}`;
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result.result[0]);
        
        setNews(result.result[0]);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchData();
  }, [postId]);

  if (!news) {
    return <p>Loading...</p>;
  }

  return (
    <section className='details'>
      <section className='details__section'>
        <Heading heading={news.title}/>
        <p className='details__section--date'>{norwegianDate(news._createdAt)}</p>
      </section>
      {divideTextIntoSections(news.nyhet, 400).map((section, index) => (
        <p key={index} className='details__p'>{section}</p>
      ))}
      {news.fileUrl && (
        <div className='details__pdf'>
          <button onClick={() => handlePdf(news.fileUrl, news.title)} id='viewPdf'>
            View PDF
          </button>
        </div>
      )}
    </section>
  )
}

export default Details;