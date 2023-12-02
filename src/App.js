import React from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import "./components/News.css";
import "./App.css";

function App() {
  const Apikey = "65f7ce42ada1408eb38014cb76d6d72f";

  return (
    <Router>
      <div className="bg-secondary-subtle text-emphasis-primary p-3 border border-5">
        <Navbar />
        <div
          className="container my-4 py-4 border rounded border-dark shadow-lg"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <h1 className="text-center text-primary mb-4 h1 pb-2 mb-4 text-danger border-bottom border-danger">
            RapidReveal: Unveiling Today's News Feed
          </h1>
          <Routes>
            <Route path="/" element={<News key="general" apikey={Apikey} category="general" />} />
            <Route path="/general" element={<News key="general" apikey={Apikey} category="general" />} />
            <Route path="/business" element={<News key="business" apikey={Apikey} category="business" />} />
            <Route path="/entertainment" element={<News key="entertainment" apikey={Apikey} category="entertainment" />} />
            <Route path="/sports" element={<News key="sports" apikey={Apikey} category="sports" />} />
            <Route path="/health" element={<News key="health" apikey={Apikey} category="health" />} />
            <Route path="/science" element={<News key="science" apikey={Apikey} category="science" />} />
            <Route path="/technology" element={<News key="technology" apikey={Apikey} category="technology" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
