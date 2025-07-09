import './App.css';
import LoginComponents from './Components/Auth/Login';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupComponent from './Components/Auth/Signup';
import EventRegistrationComponent from './Components/Events/EventRegistrations/EventRegistration';
import HomePage from './Components/LandingPage/HomePage';
import FindEvents from './Components/Events/FindEvent';
import AdminDashboard from './Admin/AdminDashboard/AdminDashboard';
import UserProvider from './Components/Auth/authContext';
import DynamicHeader from './DynamicHeader';
import AdminEventManager from './Admin/AdminDashboard/EventManager';
import UserList from './Admin/AdminDashboard/Userlist';
import MyBookings from './Components/Events/EventRegistrations/MyBookings';
import UserDashboard from './Components/userDashboard/Userdashboard';
import EsewaPaymentForm from './Components/Payments/payemts';
function App() {
  return (

    <BrowserRouter>
      <UserProvider>
        <DynamicHeader />


        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginComponents />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/event-list" element={<FindEvents />} />
          <Route path="/event-list/register-for-event" element={<EventRegistrationComponent />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/events" element={<AdminEventManager />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/payment" element={<EsewaPaymentForm />} />


        </Routes>
      </UserProvider>
    </BrowserRouter>

  );
}

export default App;
