import { useMemo, useState, useRef } from "react";
import styled from "@emotion/styled";
import {
  Alert, Box, Checkbox, FormControlLabel, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TableSortLabel, TextField, Typography, CircularProgress
} from "@mui/material";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter,
  Area, AreaChart
} from "recharts";
import { Download, FileJson, Trash2, Upload } from "lucide-react";

import { parseCSVFile } from "../utils/csvParser";
import { calculateAllRows, calculateSummary } from "../utils/calculations";
import { SampleRowCalculated } from "../types/samples";
import { exportToCSV, exportTableToPDF, downloadJSON } from "../utils/exportUtils";
import { useLocalStorage } from "../utils/storageHooks";
import { downloadSampleCSV } from "../utils/sampleCsvData";

type SortField = "adjustedMoisture" | "adjustedDensity" | null;
type SortOrder = "asc" | "desc";

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 30px;

  h1 {
    font-size: 32px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    font-size: 14px;
  }
`;

const ControlsSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
`;

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  input {
    display: none;
  }
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    background: #764ba2;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ClearButton = styled(ExportButton)`
  background: #ff6b6b;

  &:hover {
    background: #ee5a52;
  }
`;

const InfoBox = styled.div`
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(16, 185, 129, 0.1) 100%);
  border-left: 4px solid #10b981;
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
  font-size: 13px;
  color: #333;

  h4 {
    margin: 0 0 10px 0;
    color: #10b981;
    font-size: 14px;
  }

  p {
    margin: 6px 0;
    line-height: 1.5;

    code {
      background: rgba(16, 185, 129, 0.1);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
      color: #10b981;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 8px 0;

    li {
      padding: 4px 0;
      padding-left: 16px;

      &:before {
        content: "✓ ";
        color: #10b981;
        font-weight: bold;
        margin-left: -12px;
        margin-right: 8px;
      }
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #667eea;

  .stat-label {
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #667eea;
  }
`;

const ChartsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

const ChartCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  h3 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }
`;

const TableSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
`;

const SummarySection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const SummaryCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 12px;

  h4 {
    margin: 0 0 15px 0;
    font-size: 14px;
    opacity: 0.9;
  }

  .summary-items {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .item {
      display: flex;
      justify-content: space-between;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }

      .item-label {
        font-size: 13px;
        opacity: 0.9;
      }

      .item-value {
        font-weight: 600;
        font-size: 14px;
      }
    }
  }
`;

export const Samples = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [rows, setRows] = useLocalStorage<SampleRowCalculated[]>("geolab_samples", []);
  const [filter, setFilter] = useState("");
  const [autoRecalculate, setAutoRecalculate] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const tableRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (file: File) => {
    try {
      setLoading(true);
      setError(null);
      const parsedRows = await parseCSVFile(file);
      const calculatedRows = calculateAllRows(parsedRows);
      setRows(calculatedRows);
      setFileName(file.name);
    } catch (err) {
      setError("Failed to parse CSV file. Please upload a valid CSV format.");
      console.error("CSV parsing failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCellChange = (
    sampleId: string,
    field: keyof SampleRowCalculated,
    value: number
  ) => {
    const updated = rows.map((row) =>
      row.sampleId === sampleId ? { ...row, [field]: value } : row
    );
    if (autoRecalculate) {
      setRows(calculateAllRows(updated));
    } else {
      setRows(updated);
    }
  };

  const filteredRows = useMemo(
    () => rows.filter((row) => row.sampleId.toLowerCase().includes(filter.toLowerCase())),
    [rows, filter]
  );

  const sortedRows = useMemo(() => {
    const sorted = [...filteredRows].sort((a, b) => {
      if (!sortField) return 0;

      const valueA = a[sortField];
      const valueB = b[sortField];

      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });
    return sorted;
  }, [filteredRows, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const summary = useMemo(() => calculateSummary(sortedRows), [sortedRows]);

  const chartData = useMemo(
    () =>
      sortedRows.map((row, index) => ({
        id: row.sampleId,
        index: index + 1,
        moisture: parseFloat(row.adjustedMoisture.toFixed(2)),
        density: parseFloat(row.adjustedDensity.toFixed(2)),
        porosity: parseFloat(row.porosity.toFixed(2)),
      })),
    [sortedRows]
  );

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all data?")) {
      setRows([]);
      setFileName(null);
      setError(null);
    }
  };

  return (
    <Container>
      <Header>
        <h1>Sample Analysis</h1>
        <p>Upload CSV data, analyze, visualize, and export your geospatial samples</p>
      </Header>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <ControlsSection>
        <ControlsGrid>
          <UploadButton>
            <Upload size={18} />
            Upload CSV
            <input
              type="file"
              accept=".csv"
              disabled={loading}
              onChange={(evt) => {
                const file = evt.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
            />
          </UploadButton>

          <ExportButton
            onClick={downloadSampleCSV}
            style={{ background: "#10b981" }}
            disabled={loading}
            title="Download a sample CSV file to understand the format"
          >
            <Download size={18} />
            Sample CSV
          </ExportButton>

          <ExportButton
            onClick={() => exportToCSV(sortedRows, "geolab-samples.csv")}
            disabled={rows.length === 0 || loading}
          >
            <Download size={18} />
            Export CSV
          </ExportButton>

          <ExportButton
            onClick={() => {
              if (tableRef.current) {
                exportTableToPDF(tableRef.current, "geolab-report.pdf", "GeoLab Sample Analysis Report");
              }
            }}
            disabled={rows.length === 0 || loading}
          >
            <Download size={18} />
            Export PDF
          </ExportButton>

          <ExportButton
            onClick={() =>
              downloadJSON(
                {
                  exportDate: new Date().toISOString(),
                  fileName,
                  samples: sortedRows,
                  summary,
                },
                "geolab-data.json"
              )
            }
            disabled={rows.length === 0 || loading}
          >
            <FileJson size={18} />
            Export JSON
          </ExportButton>

          <ClearButton onClick={handleClearData} disabled={rows.length === 0 || loading}>
            <Trash2 size={18} />
            Clear All
          </ClearButton>
        </ControlsGrid>

        {loading && <CircularProgress size={24} sx={{ mt: 1 }} />}
        {fileName && !error && (
          <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
            📁 <strong>{fileName}</strong> - {rows.length} samples loaded
          </Typography>
        )}

        <InfoBox>
          <h4>📋 CSV Format Guide</h4>
          <p>
            Your CSV file should include these columns: <code>sampleId</code>, <code>moisture</code>,
            <code>dryDensity</code>, <code>correctionFactor</code>, <code>porosity</code>
          </p>
          <ul>
            <li><strong>sampleId</strong>: Unique identifier (e.g., S001, S002)</li>
            <li><strong>moisture</strong>: Moisture percentage (0-100)</li>
            <li><strong>dryDensity</strong>: Dry density in g/cm³ (1.0-2.5)</li>
            <li><strong>correctionFactor</strong>: Correction % (0-10)</li>
            <li><strong>porosity</strong>: Porosity percentage (15-40)</li>
          </ul>
          <p>
            👉 Click "<strong>Sample CSV</strong>" to download an example file and see the exact format!
          </p>
        </InfoBox>

        <StatsGrid>
          <StatCard>
            <div className="stat-label">Total Samples</div>
            <div className="stat-value">{rows.length}</div>
          </StatCard>
          <StatCard>
            <div className="stat-label">Avg Moisture</div>
            <div className="stat-value">{summary.avgMoisture.toFixed(2)}%</div>
          </StatCard>
          <StatCard>
            <div className="stat-label">Avg Density</div>
            <div className="stat-value">{summary.avgDensity.toFixed(2)}</div>
          </StatCard>
          <StatCard>
            <div className="stat-label">Avg Porosity</div>
            <div className="stat-value">{summary.avgPorosity?.toFixed(2) ?? "N/A"}%</div>
          </StatCard>
        </StatsGrid>
      </ControlsSection>

      {rows.length > 0 && (
        <>
          <ChartsSection>
            <ChartCard>
              <h3>Adjusted Moisture Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="moisture"
                    stroke="#667eea"
                    strokeWidth={2}
                    dot={{ fill: "#667eea", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
              <h3>Adjusted Density Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="density" fill="#764ba2" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
              <h3>Moisture vs Density Relationship</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="moisture" name="Moisture (%)" />
                  <YAxis dataKey="density" name="Density (g/cm³)" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Samples" data={chartData} fill="#667eea" />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard>
              <h3>Porosity Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="porosity"
                    fill="#667eea"
                    stroke="#667eea"
                    opacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </ChartsSection>

          <TableSection ref={tableRef}>
            <h3 style={{ marginBottom: "15px", color: "#333" }}>Data Table</h3>
            <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
              <TextField
                size="small"
                label="Filter by Sample ID"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                sx={{ flex: 1, maxWidth: "300px" }}
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
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell>Sample ID</TableCell>
                    <TableCell align="right">Moisture (%)</TableCell>
                    <TableCell align="right">Dry Density (g/cm³)</TableCell>
                    <TableCell align="right">Correction Factor (%)</TableCell>
                    <TableCell align="right">Porosity (%)</TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={sortField === "adjustedMoisture"}
                        direction={sortOrder}
                        onClick={() => handleSort("adjustedMoisture")}
                      >
                        Adj. Moisture
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={sortField === "adjustedDensity"}
                        direction={sortOrder}
                        onClick={() => handleSort("adjustedDensity")}
                      >
                        Adj. Density
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRows.map((row) => (
                    <TableRow key={row.sampleId} hover>
                      <TableCell>{row.sampleId}</TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          size="small"
                          value={row.moisture}
                          onChange={(e) =>
                            handleCellChange(row.sampleId, "moisture", Number(e.target.value))
                          }
                          variant="outlined"
                          sx={{ width: "80px" }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          size="small"
                          value={row.dryDensity}
                          onChange={(e) =>
                            handleCellChange(row.sampleId, "dryDensity", Number(e.target.value))
                          }
                          variant="outlined"
                          sx={{ width: "80px" }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          size="small"
                          value={row.correctionFactor}
                          onChange={(e) =>
                            handleCellChange(
                              row.sampleId,
                              "correctionFactor",
                              Number(e.target.value)
                            )
                          }
                          variant="outlined"
                          sx={{ width: "80px" }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          size="small"
                          value={row.porosity}
                          onChange={(e) =>
                            handleCellChange(row.sampleId, "porosity", Number(e.target.value))
                          }
                          variant="outlined"
                          sx={{ width: "80px" }}
                        />
                      </TableCell>
                      <TableCell align="right">{row.adjustedMoisture.toFixed(2)}</TableCell>
                      <TableCell align="right">{row.adjustedDensity.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TableSection>

          <SummarySection>
            <SummaryCard>
              <h4>Sample Statistics</h4>
              <div className="summary-items">
                <div className="item">
                  <span className="item-label">Total Samples</span>
                  <span className="item-value">{summary.totalSamples}</span>
                </div>
                <div className="item">
                  <span className="item-label">Avg Moisture</span>
                  <span className="item-value">{summary.avgMoisture.toFixed(3)}%</span>
                </div>
                <div className="item">
                  <span className="item-label">Avg Density</span>
                  <span className="item-value">{summary.avgDensity.toFixed(3)} g/cm³</span>
                </div>
              </div>
            </SummaryCard>

            <SummaryCard>
              <h4>Data Range</h4>
              <div className="summary-items">
                <div className="item">
                  <span className="item-label">Min Moisture</span>
                  <span className="item-value">
                    {Math.min(...sortedRows.map((r) => r.adjustedMoisture)).toFixed(2)}%
                  </span>
                </div>
                <div className="item">
                  <span className="item-label">Max Moisture</span>
                  <span className="item-value">
                    {Math.max(...sortedRows.map((r) => r.adjustedMoisture)).toFixed(2)}%
                  </span>
                </div>
                <div className="item">
                  <span className="item-label">Range</span>
                  <span className="item-value">
                    {(
                      Math.max(...sortedRows.map((r) => r.adjustedMoisture)) -
                      Math.min(...sortedRows.map((r) => r.adjustedMoisture))
                    ).toFixed(2)}
                    %
                  </span>
                </div>
              </div>
            </SummaryCard>
          </SummarySection>
        </>
      )}

      {rows.length === 0 && (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
            border: "2px dashed #667eea",
          }}
        >
          <Typography variant="h6" color="#999" sx={{ mb: 1 }}>
            No data uploaded yet
          </Typography>
          <Typography variant="body2" color="#999">
            Upload a CSV file to begin analysis
          </Typography>
        </Paper>
      )}
    </Container>
  );
};