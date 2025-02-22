import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import './App.css';

const DoctorDashboard = () => {
  const doctor = { name: 'Dr. Smith' };

  // Load saved reports from localStorage
  const getSavedReports = () => {
    const storedReports = localStorage.getItem('reports');
    return storedReports ? JSON.parse(storedReports) : [
      { date: '2025-01-10', patient: 'John Doe', name: 'Annual Physical Report' },
      { date: '2024-12-05', patient: 'Mikaela B', name: 'Dermatology Checkup' },
      { date: '2024-11-20', patient: 'Kim C', name: 'Blood Test Results' },
    ];
  };

  const [reports, setReports] = useState(getSavedReports);
  const [newPatient, setNewPatient] = useState('');
  const [newReportName, setNewReportName] = useState('');

  // Save reports to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }, [reports]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file && newPatient && newReportName) {
      const newReport = {
        date: new Date().toISOString().split('T')[0],
        patient: newPatient,
        name: newReportName,
      };

      // Update state & save to localStorage
      setReports((prevReports) => {
        const updatedReports = [...prevReports, newReport];
        localStorage.setItem('reports', JSON.stringify(updatedReports));
        return updatedReports;
      });

      setNewPatient('');
      setNewReportName('');
    }
  };

  const patients = [...new Set(reports.map(report => report.patient))];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {doctor.name}</h1>
      
      <Tab.Group>
        <Tab.List className="tab-list">
          <Tab className="tab">Upload Report</Tab>
          {patients.map((patient, index) => (
            <Tab key={index} className="tab">{patient}</Tab>
          ))}
        </Tab.List>
        
        <Tab.Panels>
          <Tab.Panel className="upload-panel">
            <h2 className="section-title">Upload a New Report</h2>
            <div className="upload-container">
              <input
                type="text"
                placeholder="Enter patient name"
                value={newPatient}
                onChange={(e) => setNewPatient(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Enter report name"
                value={newReportName}
                onChange={(e) => setNewReportName(e.target.value)}
                className="input-field"
              />
              <input type="file" onChange={handleUpload} className="file-input" />
            </div>
          </Tab.Panel>
          
          {patients.map((patient, index) => (
            <Tab.Panel key={index} className="patient-panel">
              <h2 className="section-title patient-title">
                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${patient}`} alt={patient} className="patient-avatar" />
                Reports for {patient}
              </h2>
              <div className="table-container">
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Report</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.filter(report => report.patient === patient).map((report, idx) => (
                      <tr key={idx}>
                        <td>{report.date}</td>
                        <td>{report.name}</td>
                        <td>
                          <a href="#" download={report.name} className="download-link">Download</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default DoctorDashboard;
