export interface SampleRow {
    sampleId: string;
    moisture: number;
    dryDensity: number;
    correctionFactor: number;
    porosity: number;
  };

  export interface SampleRowCalculated extends SampleRow {
    adjustedMoisture: number;
    adjustedDensity: number;
  }

  export type CsvRow = {
    sampleId: string;
    moisture: string;
    dryDensity: string;
    correctionFactor?: string;
    porosity?: string;
  }