import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords }) => {
  const defaultTitle = 'Nøklevann Borettslag';
  const defaultDescription = 'En hjemmeside for inbyggerne i nøklevann borettslag, les viktig informasjon for regler og annet i borettslaget.';
  const defaultKeywords = 'noklevann, nøklevann, nøklevann borettslag, noklevann borettslag, noklevann hjemmeside, nøklevann hjemmeside, noklevann borettslag hjemmeside, nøklevann borettslag hjemmeside';

  return (
    <Helmet>
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
};

export default SEO;