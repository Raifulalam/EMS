import './App.css';
import LoginComponents from './Components/Auth/Login';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupComponent from './Components/Auth/Signup';
import EventRegistrationComponent from './Components/Events/EventRegistrations/EventRegistration';
import HomePage from './Components/LandingPage/HomePage';
import FindEvents from './Components/Events/FindEvent';
import AdminDashboard from './Admin/AdminDashboard/AdminDashboard';
import UserProvider from './Components/Auth/authContext';
import DynamicHeader from './DynamicHeader';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>

        <DynamicHeader />


        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginComponents />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/event-list" element={<FindEvents />} />
          <Route path="/event-list/register-for-event" element={<EventRegistrationComponent />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
