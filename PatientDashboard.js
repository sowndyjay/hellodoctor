import React, { useState } from "react";
import './Patient.css';

const PatientDashboard = ({ reports = [] }) => { // Provide a default value for reports
  const user = { name: "Welcome to your portal!" }; // Replace with dynamic user data if needed
  const [filterDate, setFilterDate] = useState("");
  const [sortByLatest, setSortByLatest] = useState(false);
  const [summary, setSummary] = useState("");

  // Sample report data
  const sampleReport = {
    date: "2023-10-01",
    doctor: "Dr. Smith",
    doctorType: "Cardiologist",
    downloadLink: "#", // Replace with actual link if needed
  };

  // Filter reports by date
  const filteredReports = filterDate
    ? reports.filter((report) => report.date === filterDate)
    : reports;

  // Sort reports by latest date
  const sortedReports = sortByLatest
    ? [...filteredReports].sort((a, b) => new Date(b.date) - new Date(a.date))
    : filteredReports;

  // Combine sample report with sorted reports if no reports are available
  const displayReports = sortedReports.length > 0 ? sortedReports : [sampleReport];

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
      {displayReports.length === 0 ? ( // Check if there are no reports
        <p className="no-reports">No reports available for the selected date.</p>
      ) : (
        <div className="reports-list">
          {displayReports.map((report, index) => ( // Display sample report or filtered reports
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