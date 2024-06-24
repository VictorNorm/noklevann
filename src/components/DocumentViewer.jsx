import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function DocumentViewer({ title, fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className='document-wrapper' onClick={() => setIsOpen(!isOpen)}>
      <div className='document-icon'>
        {/* Place your icon here */}
        ICON HERE
      </div>
      <section className='document-title'>{title}</section>
      {isOpen && (
        <div className="pdf-viewer">
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
}


export default DocumentViewer;