import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { SampleRowCalculated } from "../types/samples";

export const exportToCSV = (data: SampleRowCalculated[], filename: string = "data.csv") => {
  if (data.length === 0) {
    alert("No data to export");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map(row =>
      headers
        .map(header => {
          const value = row[header as keyof SampleRowCalculated];
          return typeof value === "string" ? `"${value}"` : value;
        })
        .join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportTableToPDF = async (
  tableElement: HTMLElement,
  filename: string = "data.pdf",
  title: string = "GeoLab Report"
) => {
  try {
    const canvas = await html2canvas(tableElement, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    // Add title
    pdf.setFontSize(16);
    pdf.text(title, 10, 10);
    pdf.setFontSize(10);
    pdf.text(`Generated: ${new Date().toLocaleString()}`, 10, 20);

    // Add image
    const imgWidth = pdf.internal.pageSize.getWidth() - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, "PNG", 10, 30, imgWidth, imgHeight);
    pdf.save(filename);
  } catch (err) {
    console.error("PDF generation failed:", err);
    alert("Failed to generate PDF");
  }
};

export const downloadJSON = (data: object, filename: string = "data.json") => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
