'use client';

import {pdfjs, Document, Page} from 'react-pdf';
import { useState } from 'react';
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
//import { pdfjs } from 'react-pdf';
// necesario para que funcione
//pdfjs.GlobalWorkerOptions.workerSrc == `/pdf.worker.min.js`// `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

//mport { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();



export default function PdfViewer({ file }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="mt-4 w-full flex flex-col items-center">
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={600}
          />
        ))}
      </Document>
    </div>
  );
}