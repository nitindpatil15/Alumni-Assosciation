import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import Navbar from "./component/Navbar";
import Footer from "./Footer";
import EventPosting from "./component/Alumni/EventPosting";
import RegisterEvent from "./component/Alumni/RegisterEvent";
import JobPostingForm from "./component/Alumni/JobPostingForm";
import JobInternshipAdmin from "./component/Alumni/JobInternshipAdmin";
import EventUser from "./component/Student/EventUser";
import JobUser from "./component/Student/JobInternshipUser"
import JobInternshipUser from "./component/Student/JobInternshipUser";
import InternshipPosting from "./component/Alumni/InternshipPostingForm";
import InternshipPostingForm from "./component/Alumni/InternshipPostingForm";
import LandingPage from "./component/Alumni/LandingPage";
import LoginFormAlumni from "./component/Alumni/LoginFormAlumni";
import LoginTeacher from "./component/Institute/LoginTeacher";
import Chatbot from "./component/Alumni/Chatbot";
// import AlumniReg from "./component/Alumni/AlumniRegForm";
import Chat from "./component/Chat/Chat";
import LoginFormStudent from "./component/Login";
import Registration from "./component/Alumni/Registration";
import EditProfile from "./component/Alumni/EditProfile";
import SuccessStory from "./component/Alumni/SuccessStory";
import DocumentKeeper from "./component/Alumni/DocumentKeeper";


function App() {
  
  return (
    
    <Router>
      <Navbar title="Alumni"/>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<LoginFormStudent/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/events/:id" element={<RegisterEvent/>} />
          <Route path="/eventpost" element={<EventPosting/>} />
          <Route path="/Jobposting" element={<JobPostingForm/>} />
          <Route path="/JobinternAdmin" element={<JobInternshipAdmin/>} />
          <Route path="/EventUser" element={<EventUser/>} />
          <Route path="/JobUser" element={<JobInternshipUser/>} />
          <Route path="/InternPost" element={<InternshipPostingForm/>} />
          <Route path="/AlumniLogin" element={<LoginFormAlumni/>} />
          <Route path="/TeacherLogin" element={<LoginTeacher/>} />
          {/* <Route path="/AlumniReg" element={<AlumniRegForm/>} /> */}
          {/* <Route path="/events" element={<EventPage/>} /> */}
          <Route path="/get-event/:id" element={<RegisterEvent/>} />
          <Route path="/Chatbot" element={<Chatbot/>} /> 
          <Route path="/Register" element={<Registration/>} />
          <Route path="/EditProfile" element={<EditProfile/>} />
          <Route path="/SuccessStory" element={<SuccessStory/>} />
          {/* <Route path="/Dockeeper" element={<DocumentKeeper/>} /> */}
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;
