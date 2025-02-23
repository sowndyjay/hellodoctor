import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorDashboard from './DoctorDashboard';  // Import the components
import PatientDashboard from './PatientDashboard'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('doctor');  // Default to doctor login
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    
    const doctorCredentials = { email: 'doctor@example.com', password: 'password123' };
    const patientCredentials = { email: 'patient@example.com', password: 'password123' };

    
    if (role === 'doctor' && email === doctorCredentials.email && password === doctorCredentials.password) {
      navigate('/doctor-dashboard');  
    } else if (role === 'patient' && email === patientCredentials.email && password === patientCredentials.password) {
      navigate('/patient-dashboard');  
    } else {
      setError('Invalid email or password');  
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {role === 'doctor' ? 'Doctor Login' : 'Patient Login'}
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-between mb-4">
          <button 
            onClick={() => setRole('doctor')}
            className={`w-1/2 py-2 ${role === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
          >
            Doctor
          </button>
          <button 
            onClick={() => setRole('patient')}
            className={`w-1/2 py-2 ${role === 'patient' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
          >
            Patient
          </button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


