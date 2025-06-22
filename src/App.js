import './App.css';
import LoginComponents from './Components/Login/Login';
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupComponent from './Components/Signup/Signup';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginComponents />} />
        <Route path="/signup" element={<SignupComponent />} />
        {/* Add more routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
