import Papa from "papaparse";
import type { CsvRow, SampleRow } from "../types/samples";

export const parseCSVFile = (file: File): Promise<SampleRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<CsvRow>(file, {
        header: true,
  skipEmptyLines: true,
      complete: (result) => {
        const rows: SampleRow[] = result.data.map(({ sampleId, moisture, dryDensity, correctionFactor, porosity }: CsvRow) => {
            if (!sampleId || isNaN(Number(moisture)) || isNaN(Number(dryDensity))) {
                throw new Error("Invalid CSV format");
              }
            return {
            sampleId: sampleId,
            moisture: Number(moisture),
            dryDensity: Number(dryDensity),
            correctionFactor: correctionFactor
              ? Number(correctionFactor)
              : 5,
            porosity: porosity ? Number(porosity) : 30,
          }});
        resolve(rows);
      },

      error: (error) => reject(error),
    });
  });
};
