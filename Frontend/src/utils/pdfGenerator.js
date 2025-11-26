// utils/pdfGenerator.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (elementId, filename = "document.pdf") => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Element not found for PDF generation");
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 210; // A4 width in mm
  const pageHeight = 295; // A4 height in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
  return pdf;
};

export const generatePDFPreview = async (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Element not found for PDF preview");
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const newWindow = window.open();
  newWindow.document.write(`
    <html>
      <head>
        <title>Preview</title>
        <style>
          body { margin: 0; padding: 20px; background: #f5f5f5; }
          img { max-width: 100%; height: auto; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        </style>
      </head>
      <body>
        <img src="${imgData}" alt="Preview" />
      </body>
    </html>
  `);
  newWindow.document.close();
};
