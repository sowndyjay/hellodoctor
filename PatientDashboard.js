import React, { useState } from "react";

const PatientDashboard = ({ reports }) => {
  const user = { name: "John Doe" }; // Replace with dynamic user data if needed
  const [filterDate, setFilterDate] = useState("");
  const [sortByLatest, setSortByLatest] = useState(false);
  const [summary, setSummary] = useState("");

  // Filter reports by date
  const filteredReports = filterDate
    ? reports.filter((report) => report.date === filterDate)
    : reports;

  // Sort reports by latest date
  const sortedReports = sortByLatest
    ? [...filteredReports].sort((a, b) => new Date(b.date) - new Date(a.date))
    : filteredReports;

  // Function to generate summary
  const generateSummary = async (reportData) => {
    try {
      const response = await fetch("http://localhost:5000/generate-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportData }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      setSummary("Failed to generate summary.");
    }
  };

  return (
    <div className="patient-dashboard">
      {/* Greeting */}
      <h1 className="dashboard-title">Hello, {user.name}</h1>

      {/* Filter Section */}
      <div className="filter-section">
        <label htmlFor="filterDate" className="filter-label">
          Filter by Date:
        </label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="filter-input"
        />
        <button
          onClick={() => setSortByLatest(!sortByLatest)}
          className={`sort-button ${sortByLatest ? "active" : ""}`}
        >
          {sortByLatest ? "Show All" : "Sort by Latest"}
        </button>
      </div>

      {/* Reports Section */}
      <h2 className="section-title">Your Medical Reports</h2>
      {sortedReports.length === 0 ? (
        <p className="no-reports">No reports available for the selected date.</p>
      ) : (
        <div className="reports-list">
          {sortedReports.map((report, index) => (
            <div key={index} className="report-card">
              <div className="report-details">
                <p>
                  <strong>Date:</strong> {report.date}
                </p>
                <p>
                  <strong>Doctor:</strong> {report.doctor} ({report.doctorType})
                </p>
              </div>
              <div className="report-actions">
                <a
                  href={report.downloadLink}
                  download
                  className="download-button"
                >
                  <i className="fas fa-download"></i> Download Report
                </a>
                <button
                  onClick={() => generateSummary(report)}
                  className="generate-summary-button"
                >
                  <i className="fas fa-magic"></i> Generate Summary
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Section */}
      {summary && (
        <div className="summary-section">
          <h3>Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;