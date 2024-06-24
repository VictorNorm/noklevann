import React, { useState, useEffect } from 'react';
import Heading from "../components/Heading"
import { norwegianDate } from '../functions/norwegianDate';
import { newsTrimmer } from '../functions/newsTrimmer';

function Hjem() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = encodeURIComponent(`*[_type == "nyheter"]`);
      const url = `https://39o8vvzc.api.sanity.io/v2024-03-19/data/query/production?query=${query}`;
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result.result)
        
        setNews(result.result);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Heading heading={"Styret"}/>

    <div className='kontakt'>
      <table>
        <tr>
            <td><strong>Styreleder:</strong></td>
            <td>Knut Sture Myra</td>
        </tr>
        <tr>
            <td><strong>Nestleder:</strong></td>
            <td>Matilde Risopatron Berg</td>
        </tr>
        <tr>
            <td><strong>Styremedlem:</strong></td>
            <td>Helene Lunde, Pål Akselsen, Randi Mathiesen</td>
        </tr>
        <tr>
            <td><strong>Varamedlem:</strong></td>
            <td>Jorunn Tønnesen, Tore Moberg</td>
        </tr>
      </table>

      <ul><strong>Driftsleders arbeidstid er som følger:</strong>
        <li>Mandag og tirsdag: 08:00 - 16:00</li>
        <li>Onsdag: 08:00 - 12:00</li>
      </ul>

      <p className='kontakt--p'>Driftsleder har telefontid mandag til onsdag 10-12, tlf: 489 50 534</p>

      <section>
        <p><strong>Henvendelser styret:</strong> <a href="mailto:styret@noklevann.no">styret@noklevann.no</a></p>
        <p><strong>Henvendelser drift:</strong> <a href="mailto:drift@noklevann.no">drift@noklevann.no</a></p>
      </section>

    </div>

    <h2 id='nyheter'>Nyheter</h2>

    <div className='nyheter'>

      {news.map((post) => {
        return <a className='nyhet' key={post._id} href={`/nyhet?id=${post._id}`}>
          <section className='nyhet__header'>
          <h3>{post.title}</h3>
          <p className='nyhet__header__date'>{norwegianDate(post._createdAt)}</p>
          </section>
          <section className='nyhet__text'>
            {newsTrimmer(post.nyhet)}
          </section>
        </a>
      })}
    </div>
    </>
  )
}

export default Hjem