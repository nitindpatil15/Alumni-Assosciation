import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import Navbar from "./component/Navbar";
import Footer from "./Footer";
import EventPage from "./component/Alumni/EventPosting";
import RegisterEvent from "./component/Alumni/RegisterEvent";


function App() {
  return (
    <Router>
      <Navbar title="Alumni"/>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/events" element={<RegisterEvent/>} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
