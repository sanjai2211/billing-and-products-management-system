// createPdfDocument.js
import React from 'react';
import { Document, Page } from '@react-pdf/renderer';

export const CreatePDFDocument = ({ data, template } : any) => {
  const Template = template;

  return (
    <Document>
      {data?.map((item : any, index : any) => (
        <Page key={index} size="A4">
          <Template data={item} />
        </Page>
      ))}
    </Document>
  );
};

