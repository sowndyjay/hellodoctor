import React from "react";

const PatientDashboard = () => {
  const user = { name: "John Doe" };
  const reports = [
    { date: "2025-01-10", doctor: "Dr. Smith", name: "Annual Physical Report" },
    { date: "2024-12-05", doctor: "Dr. Johnson", name: "Dermatology Checkup" },
    { date: "2024-11-20", doctor: "Dr. Lee", name: "Blood Test Results" }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Hello, {user.name}</h1>
      <h2 className="text-lg mt-4">Your Medical Reports</h2>
      <table className="w-full mt-4 border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Doctor</th>
            <th className="p-2 border">Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index} className="text-center">
              <td className="p-2 border">{report.date}</td>
              <td className="p-2 border">{report.doctor}</td>
              <td className="p-2 border">{report.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientDashboard;


