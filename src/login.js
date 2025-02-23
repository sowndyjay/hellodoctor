import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import the Login CSS file
import logo from './easydoclogofinal.png' // Adjust the path to your logo

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('doctor');
  const [showWelcome, setShowWelcome] = useState(true); // For welcome animation
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000); // 3-second welcome screen
    return () => clearTimeout(timer);
  }, []);

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
    <div className="login-container">
      {/* Logo in the top-left corner */}
      <img src={logo} alt="EasyDoc Logo" className="logo" />

      {showWelcome ? (
        <div className="fade-in-out">
          <h1 className="welcome-heading">Welcome to EasyDoc</h1>
          <p className="welcome-subtitle">Your one-stop solution for healthcare management</p>
        </div>
      ) : (
        <div className="fade-in">
          <h2 className="login-heading">{role === 'doctor' ? 'Doctor Login' : 'Patient Login'}</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="role-buttons">
            <button
              onClick={() => setRole('doctor')}
              className={role === 'doctor' ? 'active' : ''}
            >
              Doctor
            </button>
            <button
              onClick={() => setRole('patient')}
              className={role === 'patient' ? 'active' : ''}
            >
              Patient
            </button>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;


