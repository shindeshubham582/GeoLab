import { useMemo, useState } from "react";

import { Alert, Box, Button, Checkbox, FormControlLabel, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Typography } from "@mui/material"

import { parseCSVFile } from "../utils/csvParser"
import { calculateAllRows, calculateSummary } from "../utils/calculations";
import { SampleRowCalculated } from "../types/samples";

type SortField = "adjustedMoisture" | "adjustedDensity" | null;
type SortOrder = "asc" | "desc";

export const Samples = () => {
    const [fileName, setFileName] = useState<string | null>(null);
    const [rows, setRows] = useState<SampleRowCalculated[]>([]);
    const [filter, setFilter] = useState("");
    const [autoRecalculate, setAutoRecalculate] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortField, setSortField] = useState<"adjustedMoisture" | "adjustedDensity" | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");


    const handleFileUpload = async (file: File) => {
        try {
            setError(null);
            const parsedRows = await parseCSVFile(file);
            const calculatedRows = calculateAllRows(parsedRows);
            setRows(calculatedRows);
        } catch (err) {
            setError("Failed to parse CSV file. Please upload a valid CSV format.");
            console.error("CSV parsing failed:", err);
        };
    }

    const handleCellChange = (
        index: number,
        field: keyof SampleRowCalculated,
        value: number
    ) => {
        const updated = rows.map((row, i) =>
            i === index ? { ...row, [field]: value } : row
          );
        if (autoRecalculate) {
            setRows(calculateAllRows(updated));
        } else {
            setRows(updated);
        }
    };

    const filteredRows = useMemo(() => rows.filter((row) => { return row.sampleId.toLowerCase().includes(filter.toLowerCase()) }
    ), [rows, filter]);

    const sortedRows = useMemo(() => [...filteredRows].sort((a, b) => {
        if (!sortField) return 0;

        const valueA = a[sortField];
        const valueB = b[sortField];

        if (sortOrder === "asc") {
            return valueA - valueB;
        } else {
            return valueB - valueA;
        }
    }), [filteredRows, sortField, sortOrder]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            // Toggle sort order if same field clicked again
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            // New field selected → default ascending
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const summary = useMemo(() => {
        return calculateSummary(sortedRows);
      }, [sortedRows]);

    return <Box>
        <Typography variant="h4" gutterBottom>
            Samples
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="contained" component="label">
                Upload CSV
                <input type="file" accept=".csv" hidden onChange={(evt) => {
                    const file = evt.target.files?.[0];
                    if (file) {
                        setFileName(file.name);
                        handleFileUpload(file);
                    }
                }} />
            </Button>
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
            {fileName && !error && <p>Uploaded File: <strong>{fileName}</strong></p>}
        </Stack>

        <Box mt={3} display="flex" alignItems="center" gap={2}>
            <TextField
                label="Filter by Sample ID"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={autoRecalculate}
                        onChange={(e) => setAutoRecalculate(e.target.checked)}
                    />
                }
                label="Auto Recalculate"
            />
        </Box>

        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Sample ID</TableCell>
                        <TableCell>Moisture (%)</TableCell>
                        <TableCell>Dry Density (g/cm³)</TableCell>
                        <TableCell>Correction Factor (%)</TableCell>
                        <TableCell>Porosity (%)</TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sortField === "adjustedMoisture"}
                                direction={sortOrder}
                                onClick={() => handleSort("adjustedMoisture")}
                            >
                                Adjusted Moisture
                            </TableSortLabel>
                        </TableCell>
                        <TableCell><TableSortLabel
                            active={sortField === "adjustedDensity"}
                            direction={sortOrder}
                            onClick={() => handleSort("adjustedDensity")}
                        >
                            Adjusted Density
                        </TableSortLabel></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedRows.map((row, index) => (
                        <TableRow key={row.sampleId}>
                            <TableCell>{row.sampleId}</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    value={row.moisture}
                                    onChange={(e) =>
                                        handleCellChange(index, "moisture", Number(e.target.value))
                                    }
                                />
                            </TableCell>

                            <TableCell>
                                <TextField
                                    type="number"
                                    value={row.dryDensity}
                                    onChange={(e) =>
                                        handleCellChange(
                                            index,
                                            "dryDensity",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </TableCell>

                            <TableCell>
                                <TextField
                                    type="number"
                                    value={row.correctionFactor}
                                    onChange={(e) =>
                                        handleCellChange(
                                            index,
                                            "correctionFactor",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </TableCell>

                            <TableCell>
                                <TextField
                                    type="number"
                                    value={row.porosity}
                                    onChange={(e) =>
                                        handleCellChange(index, "porosity", Number(e.target.value))
                                    }
                                />
                            </TableCell>

                            <TableCell>{row.adjustedMoisture.toFixed(2)}</TableCell>
                            <TableCell>{row.adjustedDensity.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Paper sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6">Summary</Typography>
            <Typography>Total Samples: {summary.totalSamples}</Typography>
            <Typography>
                Avg Adjusted Moisture: {summary.avgMoisture}
            </Typography>
            <Typography>
                Avg Adjusted Density: {summary.avgDensity}
            </Typography>
        </Paper>
    </Box>
};