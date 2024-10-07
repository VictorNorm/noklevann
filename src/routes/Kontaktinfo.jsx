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

function Kontaktinfo() {
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const query = encodeURIComponent(`*[_type == "praktisk" && category->title == "Kontaktinfo"]{
  //       _id,
  //       title,
  //       "fileUrl": file.asset->url,
  //       "imageUrl": image.asset->url,
  //       publishedAt
  //     }`);
  //     const url = `https://39o8vvzc.api.sanity.io/v2024-03-19/data/query/production?query=${query}`;
      
  //     try {
  //       const response = await fetch(url);
  //       const result = await response.json();
  //       console.log(result);
  //       const docs = result.result.map(doc => ({
  //         imageUrl: doc.imageUrl,
  //         title: doc.title,
  //         fileUrl: doc.fileUrl,
  //         publishedAt: doc.publishedAt,
  //         id: doc._id 
  //       }));
        
  //       const sortedDocs = docs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  //       setDocuments(sortedDocs);
  //     } catch (error) {
  //       console.error('Error fetching documents:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
    <div className='hjem'>
      <SEO title="Hjem" />
      <Heading heading={"Kontaktpersoner ved akutte tilfeller."}/>
        <div className="henvendelser">
          <h3 className='henvendelser__sub-heading'>Ved akutte tilfeller kontakt driftsleder. Om han ikke er tilgjengelig henvend deg til kontaktene under.</h3>
          <h3 className='henvendelser__sub-heading'>Note: Se vedtekter for hvilke utgifter som dekkes av borettslaget eller den enkelte beboer, eller kontakt driftsleder eller styret om du er i tvil.</h3>
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
      </div>
      <h2>Styret 2024-2025</h2>
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
          <tr>
            <td><strong>Valgkomite:</strong></td>
            <td>Anders Aasland, Hilde Larsen Ormset, Svein Inge Rosseland</td>
          </tr>
          <tr>
            <td><strong>Driftsleder:</strong></td>
            <td>Knut Sture Myra</td>
          </tr>
          <tr className='tr--margin-top'>
            <td><strong>Henvendelser styret:</strong></td>
            <td>styret@noklevann.no</td>
          </tr>
          <tr>
            <td><strong>Henvendelser drift:</strong></td>
            <td>drift@noklevann.no, Tlf: 489 50 534</td>
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
      <p className='kontakt__table_p'>NB: Nye saker eller skader skal alltid meldes inn per e-post.
        Telefon og sms kan benyttes ved akutte tilfeller eller allerede etablerte driftsprosjekter.</p>

    </div>
    <h2>Velferdskomite 2024 – 2025</h2>
    <div className="kontakt">
      <table>
        <tbody>
          <tr>
            <td><strong>Velferdskomiteens medlemmer:</strong></td>
            <td>Ingerid Kolle,              
                Ingvild Seliaas,
                Anne Åstad,
                Sverre Gustavsen,
                Elena Dubinina,
                Britt H. Sjøtrø Espedal,
                Marit Jacobsen,
                Elise Skaarstad</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default Kontaktinfo;