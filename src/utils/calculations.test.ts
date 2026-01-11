import {
  calculateAdjustedMoisture,
  calculateAdjustedDensity,
  calculateAllRows,
  calculateSummary,
} from "./calculations";

import { SampleRow, SampleRowCalculated } from "../types/samples";

describe("Calculation Utilities", () => {
  describe("calculateAdjustedMoisture", () => {
    it("should calculate adjusted moisture correctly", () => {
      const result = calculateAdjustedMoisture(10, 5);
      expect(result).toBe(10 * 1.05);
    });

    it("should return same value if correction factor is 0", () => {
      const result = calculateAdjustedMoisture(20, 0);
      expect(result).toBe(20);
    });
  });

  describe("calculateAdjustedDensity", () => {
    it("should calculate adjusted density correctly", () => {
      const result = calculateAdjustedDensity(2, 10);
      expect(result).toBe(2 * 0.9);
    });

    it("should return same value if porosity is 0", () => {
      const result = calculateAdjustedDensity(1.5, 0);
      expect(result).toBe(1.5);
    });
  });

  describe("calculateAllRows", () => {
    it("should add adjusted values to each row", () => {
      const rows: SampleRow[] = [
        {
          sampleId: "S1",
          moisture: 10,
          dryDensity: 2,
          correctionFactor: 5,
          porosity: 10,
        },
      ];

      const result = calculateAllRows(rows);

      expect(result.length).toBe(1);
      expect(result[0].adjustedMoisture).toBe(10 * 1.05);
      expect(result[0].adjustedDensity).toBe(2 * 0.9);
    });
  });

  describe("calculateSummary", () => {
    it("should calculate summary correctly", () => {
      const rows: SampleRowCalculated[] = [
        {
          sampleId: "S1",
          moisture: 10,
          dryDensity: 2,
          correctionFactor: 5,
          porosity: 10,
          adjustedMoisture: 10.5,
          adjustedDensity: 1.8,
        },
        {
          sampleId: "S2",
          moisture: 20,
          dryDensity: 3,
          correctionFactor: 10,
          porosity: 20,
          adjustedMoisture: 22,
          adjustedDensity: 2.4,
        },
      ];

      const summary = calculateSummary(rows);

      expect(summary.totalSamples).toBe(2);
      expect(summary.avgMoisture).toBe(16.25);
      expect(summary.avgDensity).toBe(2.1);
    });

    it("should return zero values for empty input", () => {
      const summary = calculateSummary([]);

      expect(summary.totalSamples).toBe(0);
      expect(summary.avgMoisture).toBe(0);
      expect(summary.avgDensity).toBe(0);
    });
  });
});
