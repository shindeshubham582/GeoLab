import { SampleRow, SampleRowCalculated } from "../types/samples";

export const calculateAdjustedMoisture = (moisture: number, correctionFactor: number) => {
    return moisture * (1 + correctionFactor / 100);
};

export const calculateAdjustedDensity = (dryDensity: number, porosity: number) => {
    return dryDensity * (1 - porosity / 100);
};

export const calculateAllRows = (rows: SampleRow[]): SampleRowCalculated[] => {
    return rows.map((row) => ({
        ...row,
        adjustedMoisture: calculateAdjustedMoisture(row.moisture, row.correctionFactor),
        adjustedDensity: calculateAdjustedDensity(row.dryDensity, row.porosity),
    }));
}


export const calculateSummary = (rows: SampleRowCalculated[]) => {
    const totalSamples = rows.length;

    const avgMoisture =
        rows.reduce((sum, r) => sum + r.adjustedMoisture, 0) / totalSamples || 0;

    const avgDensity =
        rows.reduce((sum, r) => sum + r.adjustedDensity, 0) / totalSamples || 0;

    return {
        totalSamples,
        avgMoisture: Number(avgMoisture.toFixed(2)),
        avgDensity: Number(avgDensity.toFixed(2)),
    };
};
