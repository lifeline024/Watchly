import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import Adminpanel from "./Admin/Adminpanel";
import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/admin" element={<Adminpanel/>}/>
        <Route path="/request" element={<ContactForm/>} />
        </Routes>
    </Router>
  );
}

export default App;
