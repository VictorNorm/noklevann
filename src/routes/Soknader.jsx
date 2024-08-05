import React, { useState, useEffect } from 'react';
import Heading from "../components/Heading";
import { handlePdf } from '../functions/handlePdf';
import { FaFile } from "react-icons/fa";

function Soknader() {

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = encodeURIComponent(`*[_type == "praktisk" && category->title == "Søknader"]{
        _id,
        title,
        "fileUrl": file.asset->url
      }`);
      const url = `https://39o8vvzc.api.sanity.io/v2024-03-19/data/query/production?query=${query}`;
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        
        const docs = result.result.map(doc => {
          const fileUrl = doc.fileUrl;
          
          return {
            title: doc.title,
            fileUrl: fileUrl,
            id: doc._id 
          };
        });
        setDocuments(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
        <div className='soknader__tekst'>
      <div className='nokkelen'>
          <h2 id='info'>Info</h2>
          <section>
              <ul>
              <li>Henvendelser til styret skal i all hovedsak begrenses til søknader om utbygging i henhold til vedtatt generalplan,
                  oppussing av bad, skifte av soilrør, saker som er knyttet til husordensregler,
                  vedtekter, tvister beboerne imellom eller andre klager, ønske om beplantning,
                  endring av uteområder, bruk av fellesarealer, forslag til generalforsamling og forsikringssaker.</li>
                  <li>Henvendelser til driftsleder vil hovedsakelig dreie seg om alle former for skader (ødelagte vinduer, vannskader, kloakk tilbakeslag, defekte takrenner etc.).
                  Spørsmål knyttet til snømåking, strøing av stikkveier, gressklipping, henting av grøntavfall, rørfornying, mistanke om skadedyr,
                  oppfølging og kontakt i forbindelse med pågående arbeider i borettslaget og renovasjon.</li>
                  <li>Arbeidet i styret er et frivillig verv, som utføres av valgte beboere på deres fritid.
                  Av den grunn er ikke styret daglig betjent, og man må regne med at det tar noe tid og få svar på henvendelser.
                  Styret anbefaler at man ikke gjør tidsavtaler med håndverkere før det foreligger en skriftlig
                  tillatelse fra styret og eventuelt fra plan- og bygningsetaten om det omsøkte tiltaket. </li>
              </ul>
          </section>
      </div>
    </div>
      <Heading heading={"Søknader"} id={"soknader"}/>
      {documents.sort((a, b) => a.title.localeCompare(b.title)).map((file) => {
    return (
      <div className='document-wrapper' onClick={() => {handlePdf(file.fileUrl, file.title)}} key={file.id}>
        <div className='document-wrapper__image'><FaFile /></div>
        <section className='document-wrapper__section'><h3>{file.title}</h3></section>
      </div>
    );
  })}
    </>
  )
}

export default Soknader;