import React, { useState } from "react";
import './Patient.css';

const PatientDashboard = ({ reports = [] }) => { // Provide a default value for reports
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

  // Handler for scheduling appointment form submission
  const handleSchedule = (e) => {
    e.preventDefault();
    // Implement scheduling functionality here (e.g., API call, modal popup, etc.)
    console.log("Appointment scheduled!");
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
      {/* {Array.isArray(sortedReports) && sortedReports.length === 0 ? ( // Check if sortedReports is an array
        <p className="no-reports">No reports available for the selected date.</p>
      ) : (
        <div className="reports-list">
          {Array.isArray(sortedReports) && sortedReports.map((report, index) => ( // Check if sortedReports is an array
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
      )} */}
      {Array.isArray(sortedReports) && sortedReports.length === 0 ? (
        <>
          {/* <p className="no-reports">No reports available for the selected date.</p>
           */}
          {/* Display Reports from Dr. Skin */}
          <div className="demo-reports">
            {/* <h3>Available Reports from Dr. Skin</h3> */}
            <div className="reports-list">
              <div className="report-card">
                <div className="report-details">
                  <p><strong>Date:</strong> 2025-02-15</p>
                  <p><strong>Doctor:</strong> Dr. Skin (Dermatologist)</p>
                </div>
                <div className="report-actions">
                  <a href="path/to/dr-skin-report.pdf" download className="download-button">
                    <i className="fas fa-download"></i> Download Report
                  </a>
                  <button className="download-button">View Report</button>
                  <button className="download-button">Release Report</button>
                </div>
              </div>
            </div>
          </div>

          {/* Display Reports from Dr. Blood */}
          <div className="demo-reports">
            {/* <h3>Available Reports from Dr. Blood</h3> */}
            <div className="reports-list">
              <div className="report-card">
                <div className="report-details">
                  <p><strong>Date:</strong> 2025-01-22</p>
                  <p><strong>Doctor:</strong> Dr. Blood (Hematologist)</p>
                </div>
                <div className="report-actions">
                  <a href="path/to/dr-skin-report.pdf" download className="download-button">
                    <i className="fas fa-download"></i> Download Report
                  </a>
                  <button className="download-button">View Report</button>
                  <button className="download-button">Release Report</button>
                </div>
              </div>
            </div>
          </div>

          {/* Display Reports from Dr. Eye */}
          <div className="demo-reports">
            {/* <h3>Available Reports from Dr. Eye</h3> */}
            <div className="reports-list">
              <div className="report-card">
                <div className="report-details">
                  <p><strong>Date:</strong> 2024-12-03</p>
                  <p><strong>Doctor:</strong> Dr. Eye (Ophthalmologist)</p>
                </div>
                <div className="report-actions">
                  <a href="path/to/dr-skin-report.pdf" download className="download-button">
                    <i className="fas fa-download"></i> Download Report
                  </a>
                  <button className="download-button">View Report</button>
                  <button className="download-button">Release Report</button>
                </div>
              </div>
            </div>
          </div>

        </>
      ) : (
        <div className="reports-list">
          {sortedReports.map((report, index) => (
            <div key={index} className="report-card">
              <div className="report-details">
                <p><strong>Date:</strong> {report.date}</p>
                <p><strong>Doctor:</strong> {report.doctor} ({report.doctorType})</p>
              </div>
              <div className="report-actions">
                <a href={report.downloadLink} download className="download-button">
                  <i className="fas fa-download"></i> Download Report
                </a>
                <button className="download-button">View Report</button>
                <button className="download-button">Release Report</button>
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

      {/* Schedule Appointment Section */}
      <section className="schedule-appointment-section">
      <h2 className="section-title">Schedule an Appointment</h2>
        <form onSubmit={handleSchedule}>
          <div className="form-group">
            <label htmlFor="appointment-date">Date:</label>
            <input
              type="date"
              id="appointment-date"
              name="appointment-date"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointment-time">Time:</label>
            <input
              type="time"
              id="appointment-time"
              name="appointment-time"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctor-select">Select Doctor:</label>
            <select id="doctor-select" name="doctor-select" required>
              <option value="">Select a doctor</option>
              <option value="dr-smith">Dr. Eye</option>
              <option value="dr-jones">Dr. Skin</option>
              <option value="dr-jones">Dr. Blood</option>
              <option value="dr-jones">Dr. Heart</option>
            </select>
          </div>
          <button type="submit" className="schedule-button">
            Schedule Appointment
          </button>
        </form>
      </section>
    </div>
  );
};

export default PatientDashboard;
