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
    <Heading heading={"Søknader"}/>
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