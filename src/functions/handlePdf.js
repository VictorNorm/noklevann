export const handlePdf = (fileUrl, title) => {
  const pdfWindow = window.open("", "_blank");

  pdfWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          overflow: hidden;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      </style>
    </head>
    <body>
      <iframe src="${fileUrl}" type="application/pdf"></iframe>
    </body>
    </html>`);
  pdfWindow.document.title = title;
  pdfWindow.document.close();
};
