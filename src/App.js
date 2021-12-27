import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Importing pages
import SearchUserPage from "./Pages/SearchUserPage/SearchUserPage";
import RepoPage from "./Pages/RepoPage/RepoPage";

// Import Scrool to top of the page
import ScrollToTop from "./ScrollToTop";

import "./App.css";

function App() {
  const users = useSelector((state) => state.users.users);
  return (
    <div className="App">
      <Router>
        {/* With this we can be sure that when we change route our app we will always be on top of the page */}
        <ScrollToTop />
        <Routes>
          {/* Landing page and page where we search gitHub users */}
          <Route path="/" element={<SearchUserPage />} />
          {/* Repo page, where we can see all the repos from the user who we selected. If the RepoPage is reloaded, it will redirect to SearchUserPage */}
          <Route path="/userRepos" element={users.length < 1 ? <Navigate to="/" /> : <RepoPage />} />
        </Routes>
        <h2>Dejan Karavla</h2>
        <h2>dasdasdasd</h2>
      </Router>
    </div>
  );
}

export default App;
