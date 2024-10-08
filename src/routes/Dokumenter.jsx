import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Heading from "../components/Heading";
import SEO from '../components/SEO';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Important: set the worker source for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('PDF Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong with the PDF viewer.</h1>;
    }

    return this.props.children; 
  }
}

function Dokumenter() {
  const [documents, setDocuments] = useState([]);
  const [nøkkelenDocuments, setNøkkelenDocuments] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const query = encodeURIComponent(`*[_type == "praktisk" && category->title == "Rapporter"]{
        _id,
        title,
        "fileUrl": file.asset->url,
        "imageUrl": image.asset->url
      }`);
      const url = `https://39o8vvzc.api.sanity.io/v2024-03-19/data/query/production?query=${query}`;
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        
        const docs = result.result.map(doc => ({
          imageUrl: doc.imageUrl,
          title: doc.title,
          fileUrl: doc.fileUrl,
          id: doc._id 
        }));
        setDocuments(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
  }, []);

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
        // console.log(result);
        const docs = result.result.map(doc => ({
          imageUrl: doc.imageUrl,
          title: doc.title,
          fileUrl: doc.fileUrl,
          publishedAt: doc.publishedAt,
          id: doc._id 
        }));
        
        const sortedDocs = docs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        setNøkkelenDocuments(sortedDocs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
  }, []);

  const handlePdfClick = (fileUrl) => {
    if (isMobile) {
      setSelectedPdf(fileUrl);
      setPageNumber(1);
    } else {
      // Use the original handlePdf function for PC
      window.open(fileUrl, '_blank');
    }
  };

  const handleKeyDown = (event, fileUrl) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePdfClick(fileUrl);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  // Separate documents into two categories
  const arsmoteDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes('årsmøte')
  );
  const otherDocuments = documents.filter(doc => 
    !doc.title.toLowerCase().includes('årsmøte')
  );

  // Sort documents alphabetically
  const sortDocuments = (docs) => 
    docs.sort((a, b) => a.title.localeCompare(b.title));

  const renderDocuments = (docs) => 
    docs.map((file) => (
      <div className='document-wrapper' key={file.id} onClick={() => handlePdfClick(file.fileUrl)} onKeyDown={handleKeyDown}>
        <img src={file.imageUrl} alt={file.title} />
        <div className='document-wrapper__container'>
          <h3>{file.title}</h3>
          <p>Les mer..</p>
        </div>
        <button 
          onClick={() => handlePdfClick(file.fileUrl)}
          onKeyDown={(e) => handleKeyDown(e, file.fileUrl)}
          className="sr-only"
          type="button"
          id='invisible-button'
        >
          Åpne {file.title}
        </button>
      </div>
    ));

  return (
    <div className='content-wrapper'>
      <SEO title="Rapporter" />
      <Heading heading={"Rapporter"} />
      {selectedPdf && isMobile ? (
        <ErrorBoundary>
          <div className="pdf-viewer">
            <button onClick={() => setSelectedPdf(null)} type="button">Close PDF</button>
            <Document
              file={selectedPdf}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={console.error}
            >
              <Page pageNumber={pageNumber} width={Math.min(600, window.innerWidth - 30)} />
            </Document>
            <div className="pdf-controls">
              <button onClick={previousPage} disabled={pageNumber <= 1} type="button">Previous</button>
              <p>Page {pageNumber} of {numPages}</p>
              <button onClick={nextPage} disabled={pageNumber >= numPages} type="button">Next</button>
            </div>
          </div>
        </ErrorBoundary>
      ) : (
        <>
          <div>
            {renderDocuments(sortDocuments(otherDocuments))}
          </div>
          <h2>Årsmøter</h2>
          <div>
            {renderDocuments(sortDocuments(arsmoteDocuments))}
          </div>
          <h2>Nøkkelen</h2>
          <div>
            {renderDocuments(sortDocuments(nøkkelenDocuments))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dokumenter;