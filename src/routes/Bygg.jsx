import React, { useState, useEffect } from 'react';
import Heading from "../components/Heading"
import { handlePdf } from '../functions/handlePdf';
import SEO from '../components/SEO';

function Bygg() {

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = encodeURIComponent(`*[_type == "praktisk" && category->title == "Bygg"]{
        _id,
        title,
        "fileUrl": file.asset->url,
        "imageUrl": image.asset->url
      }`);
      const url = `https://39o8vvzc.api.sanity.io/v2024-03-19/data/query/production?query=${query}`;
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        
        const docs = result.result.map(doc => {
          const fileUrl = doc.fileUrl;
        
          return {
            imageUrl: doc.imageUrl,
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
    <div className='content-wrapper'>
      <SEO title="Bygg" />
    <Heading heading={"Bygg"}/>
    {documents.sort((a, b) => a.title.localeCompare(b.title)).map((file) => {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div className='document-wrapper' onClick={() => {handlePdf(file.fileUrl, file.title)}} key={file.id}>
      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
<img src={file.imageUrl} alt='placeholder'></img>
      <div className='document-wrapper__container'>
        <h3>{file.title}</h3>
        <p>Les mer..</p>
      </div>
    </div>
  );
})}
    </div>
  )
}
export default Bygg