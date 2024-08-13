import React, { useState, useEffect } from 'react';
import { handlePdf } from '../functions/handlePdf';
import Heading from "../components/Heading"

function Nøkkelen() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = encodeURIComponent(`*[_type == "praktisk" && category->title == "Nøkkelen"]{
        _id,
        title,
        "fileUrl": file.asset->url,
        "imageUrl": image.asset->url,
        publishedAt
      }`);
      const url = `https://39o8vvzc.api.sanity.io/v2024-03-19/data/query/production?query=${query}`;
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        
        const docs = result.result.map(doc => ({
          imageUrl: doc.imageUrl,
          title: doc.title,
          fileUrl: doc.fileUrl,
          publishedAt: doc.publishedAt,
          id: doc._id 
        }));
        
        const sortedDocs = docs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        setDocuments(sortedDocs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
  }, []);

  const handleKeyDown = (event, file) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePdf(file.fileUrl, file.title);
    }
  };

  return (
    <div className='content-wrapper'>
      <Heading heading={"Nøkkelen"}/>
      {documents.map((file) => (
        <div 
          className='document-wrapper' 
          onClick={() => handlePdf(file.fileUrl, file.title)} 
          onKeyDown={(e) => handleKeyDown(e, file)}
          role="button"
          tabIndex={0}
          key={file.id}
        >
          <img src={file.imageUrl} alt='placeholder'/>
          <div className='document-wrapper__container'>
            <h3>{file.title}</h3>
            <p>Les mer..</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Nøkkelen;