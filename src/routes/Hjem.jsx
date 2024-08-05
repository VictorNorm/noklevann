import React, { useState, useEffect } from 'react';
import Heading from "../components/Heading"
import { norwegianDate } from '../functions/norwegianDate';
import { newsTrimmer } from '../functions/newsTrimmer';
import { FaFile } from "react-icons/fa";

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
    <div className='hjem'>
      <Heading heading={"Henvendelser i sommerferien"}/>
        <div className="henvendelser">
          <p>
            <strong>Driftsleder</strong> har sommerferie fra 17. juli til og med 18. august. Henvendelser vil
            først bli besvart etter driftsleders ferie.
          </p>
          <p>Ved akutte tilfeller ring:</p>
          <ul>
            <li>Brann: 110.</li>
            <li>Brannvarsler, feil på anlegget mv Bracon v/Pål 975 18 015</li>
            <li>Brudd på vannrør etc. Rør og Varme v/Petter 911 65 882</li>
            <li>Kloakktilbakeslag: TT-Teknikk 02490</li>
            <li>Strømproblemer: Front Elektro 907 19 999</li>
            <li>Låsproblemer: Westby Lås & Innbruddsikring AS: 22 32 18 57</li>
            <li>Trevelting: Oslo Brannvesen 21 80 21 80</li>
            <li>Telenor (TV og internett): 915 09 000</li>
          </ul>
          <p>
            Alle andre akutte henvendelser i driftslederens ferie: Bjørnar Støen 414 24 566
          </p>
          <p>Tekst nederst på alle sider</p>
      </div>
      <h2>Styret</h2>
      <div className="kontakt">
      <table>
        <tbody>
          <tr>
            <td><strong>Styreleder:</strong></td>
            <td>Matilde Risopatron Berg</td>
          </tr>
          <tr>
            <td><strong>Nestleder:</strong></td>
            <td>Pål Axelsen</td>
          </tr>
          <tr>
            <td><strong>Styremedlem:</strong></td>
            <td>Helene Lunde, Laila Eidsvaag, Randi Mathiesen</td>
          </tr>
          <tr>
            <td><strong>Varamedlem:</strong></td>
            <td>Jorunn Tønnesen, Tore Moberg</td>
          </tr>
          <tr className='tr--margin-top'>
            <td><strong>Henvendelser styret:</strong></td>
            <td>styret@noklevann.no</td>
          </tr>
          <tr>
            <td><strong>Henvendelser drift:</strong></td>
            <td>drift@noklevann.no</td>
          </tr>
          <tr className='tr--margin-top'>
            <td><strong>Driftleders arbeidstid:</strong></td>
            <td>Mandag og tirsdag 08:00-16:00, onsdag 10:00-12:00</td>
          </tr>
          <tr>
            <td><strong>Driftleders telefontid:</strong></td>
            <td>Mandag - onsdag 10:00-12:00</td>
          </tr>
        </tbody>
      </table>

    </div>
    <h2 id='nyheter'>Nyheter</h2>
      <div className='nyheter'>
        {news.map((post) => {
          return <a className='nyhet' key={post._id} href={`/nyhet?id=${post._id}`}>
            
            <section className='nyhet__header'>
            <h3>{post.title}{post.file?.asset?._ref && (
              <FaFile />
            )}</h3>
            <p className='nyhet__header__date'>{norwegianDate(post._createdAt)}</p>
            </section>
            <section className='nyhet__header'>

            </section>
            <section className='nyhet__text'>
              {newsTrimmer(post.nyhet)}
            </section>
          </a>
        })}
      </div>
    </div>
  )
}

export default Hjem