import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';  // Import the login page component
import DoctorDashboard from './DoctorDashboard';  // Import the doctor dashboard component
import PatientDashboard from './PatientDashboard';  // Import the patient dashboard component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  // The login page route
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />  // Doctor's dashboard route
        <Route path="/patient-dashboard" element={<PatientDashboard />} />  // Patient's portal route
      </Routes>
    </Router>
  );
}

export default App;

