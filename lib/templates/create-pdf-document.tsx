// createPdfDocument.js
import React from 'react';
import { Document, Page } from '@react-pdf/renderer';
import { useTheme } from 'next-themes';

export const CreatePDFDocument = ({ data, template,theme,download=false } : any) => {
  const Template = template;
 


  return (
    <Document>
      {data?.map((item : any, index : any) => (
        <Page key={index} size="A4" style={{padding : '16px'}}>
          <Template data={item} theme={theme} download={download} />
        </Page>
      ))}
    </Document>
  );
};

