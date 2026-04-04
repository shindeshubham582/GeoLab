export const SAMPLE_CSV_DATA = `sampleId,moisture,dryDensity,correctionFactor,porosity
S001,15.2,1.8,5.0,25.0
S002,18.5,1.6,3.2,28.5
S003,12.1,1.9,4.5,22.1
S004,20.3,1.5,6.8,32.0
S005,14.7,1.85,4.2,24.5
S006,16.9,1.75,5.5,26.8
S007,19.2,1.62,3.8,30.2
S008,13.4,1.92,4.0,21.5
S009,17.6,1.68,5.3,27.9
S010,21.1,1.55,7.2,33.5`;

export const downloadSampleCSV = () => {
  const blob = new Blob([SAMPLE_CSV_DATA], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", "sample-data.csv");
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const SAMPLE_CSV_FORMAT = `
CSV Format Guide:
- First row must contain headers: sampleId, moisture, dryDensity, correctionFactor, porosity
- sampleId: Unique identifier for each sample (e.g., S001, S002)
- moisture: Moisture percentage (0-100)
- dryDensity: Dry density in g/cm³ (typically 1.0-2.5)
- correctionFactor: Correction factor in percentage (typically 0-10)
- porosity: Porosity percentage (typically 15-40)

Example rows:
S001,15.2,1.8,5.0,25.0
S002,18.5,1.6,3.2,28.5
`;
