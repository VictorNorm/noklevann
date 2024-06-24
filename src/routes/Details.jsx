import React, { useState, useEffect } from 'react';
import Heading from '../components/Heading';
import { divideTextIntoSections } from '../functions/divideTextIntoSections';
import { norwegianDate } from '../functions/norwegianDate';

function Details() {
const [news, setNews] = useState([]);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postId = urlParams.get('id'); // Since you used `?=` without a parameter name
console.log(postId)

useEffect(() => {
    const fetchData = async () => {
    const query = encodeURIComponent(`*[_type == "nyheter" && _id == "${postId}"]`);
      const url = `https://39o8vvzc.api.sanity.io/v2024-03-19/data/query/production?query=${query}`;
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result.result[0])
        
        setNews(result.result[0])
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <section className='details'>
      <section className='details__section'>
        <Heading heading={news.title}/>
        {news.nyhet ? <p className='details__section--date'>{norwegianDate(news._createdAt)}</p> : <p>Loading</p>}
      </section>

        {news.nyhet ? divideTextIntoSections(news.nyhet, 400).map((section, index) => (
      <p key={index} className='details__p'>{section}</p>
    )) : <p>Loading...</p>}
    </section>
  )
}

export default Details