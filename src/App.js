import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importing pages
import SearchUserPage from "./Pages/SearchUserPage/SearchUserPage";
import RepoPage from "./Pages/RepoPage/RepoPage";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Landing page and page where we search gitHub users */}
          <Route path="/" element={<SearchUserPage />} />
          {/* Repo page, where we can see all the repos from the user who we selected */}
          <Route path="/userRepos" element={<RepoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
