import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Heading from "../components/Heading";
import { FaFile } from "react-icons/fa";
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

function Soknader() {
  const [documents, setDocuments] = useState([]);
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
      const query = encodeURIComponent(`*[_type == "praktisk" && category->title == "Søknader"]{
        _id,
        title,
        "fileUrl": file.asset->url
      }`);
      const url = `https://39o8vvzc.api.sanity.io/v2024-03-19/data/query/production?query=${query}`;
      
      try {
        const response = await fetch(url);
        const result = await response.json();
        
        const docs = result.result.map(doc => ({
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

  return (
    <div className='content-wrapper'>
      <SEO title="Søknader" />
      <div className='soknader__tekst'>
          <h2 id='info'>Info</h2>
          <section className='info'>
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
                  tillatelse fra styret og eventuelt fra plan- og bygningsetaten om det omsøkte tiltaket.</li>
            </ul>
          </section>
      </div>
      <Heading heading={"Søknader"} id={"soknader"}/>
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
        documents.sort((a, b) => a.title.localeCompare(b.title)).map((file) => (
          <div 
            className='document-wrapper' 
            onClick={() => handlePdfClick(file.fileUrl)} 
            key={file.id}
            onKeyDown={handleKeyDown}
          >
            <div className='document-wrapper__image'><FaFile /></div>
            <section className='document-wrapper__section'>
              <h3>{file.title}</h3>
            </section>
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
        ))
      )}
    </div>
  );
}

export default Soknader;