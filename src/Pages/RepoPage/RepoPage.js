import React, { useEffect } from "react";
import "./RepoPage.css";
import axios from "axios";
import { Link } from "react-router-dom";

// Import from Redux
import { useSelector, useDispatch } from "react-redux";
import { getSelectedUserRepos } from "../../features/users";
import { setErrorRepos, setLoading } from "../../features/controler";

// Import icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";

function RepoPage() {
  // selectors
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const selectedUserRepos = useSelector((state) => state.users.selectedUserRepos);
  const errorRepos = useSelector((state) => state.controler.errorRepos);
  const loading = useSelector((state) => state.controler.loading);

  const dispatch = useDispatch();

  //   Getting repos from selected user and sorting repos by created date
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setErrorRepos(false));
    axios
      .get(selectedUser.repos_url)
      .then((res) => {
        const responseData = [...res.data];
        responseData.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        dispatch(getSelectedUserRepos(responseData));
        dispatch(setLoading(false));
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(setLoading(false));
          dispatch(setErrorRepos(true));
        }, 3000);
      });
  }, [dispatch, selectedUser]);

  return (
    <div className="RepoPage">
      <div className="RepoPage__container">
        <div className="RepoPage_buttonBack">
          <Link to="/">Back to user search</Link>
          <h1 style={{ textAlign: "center" }}>
            {selectedUser.login} has {selectedUser.public_repos} repositories
          </h1>
        </div>
        {/* This error will display if we can't get the repo data, but it will disappear in 3 seconds */}
        {errorRepos ? <h2 style={{ textAlign: "center" }}>Something went wrong. Please try again.</h2> : null}
        {/* If the user has zero repositories it is bad practise to leave empty page. Because of that we are displaying why the page is empty */}
        {selectedUser.public_repos === 0 ? (
          <h2 style={{ textAlign: "center" }}>{selectedUser.login} has no repositories to show.</h2>
        ) : (
          <div className="RepoPage__repos">
            {selectedUserRepos.map((repo) => {
              return (
                <div key={repo.id} className="RepoPage__repo">
                  <div className="RepoPage__repoInfo">
                    <div className="RepoPage__hidden">
                      <div className="Repo__iconContainer">
                        <div className="Repo__icon">
                          <VisibilityIcon />
                          <p>Unwatch</p>
                        </div>
                        {repo.watchers_count}
                      </div>
                      <div className="Repo__iconContainer">
                        <div className="Repo__icon">
                          <StarBorderIcon />
                          <p>Star</p>
                        </div>
                        {repo.stargazers_count}
                      </div>
                      <div className="Repo__iconContainer">
                        <div className="Repo__icon">
                          <DeviceHubIcon />
                          <p>Fork</p>
                        </div>
                        {repo.forks}
                      </div>
                    </div>
                    <h2 className="RepoPage__repoName">Name: {repo.name}</h2>
                    <p>
                      <strong>Description: </strong>
                      {(repo.description || "There is no decription for this repo.")
                        .split(/\s+/)
                        .slice(0, 14)
                        .join(" ")}
                    </p>
                    <p>
                      <strong>Created:</strong> {new Date(repo.created_at).toLocaleDateString("sr-RS")} at{" "}
                      {new Date(repo.created_at).toLocaleTimeString("sr-RS")}
                    </p>
                  </div>
                  <div style={{ textAlign: "center", paddingTop: "20px" }}>
                    <a rel="noreferrer" target="_blank" href={repo.html_url}>
                      Open in new tab
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {loading ? <div className="loader">Loading...</div> : null}
      </div>
    </div>
  );
}

export default RepoPage;
