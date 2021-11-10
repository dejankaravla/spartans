import React, { useEffect } from "react";
import "./RepoPage.css";
import axios from "axios";

// Importing from Redux
import { useSelector, useDispatch } from "react-redux";
import { getSelectedUserRepos } from "../../features/users";
import { setErrorRepos } from "../../features/controler";

// Import icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";

function RepoPage() {
  // selectors
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const selectedUserRepos = useSelector((state) => state.users.selectedUserRepos);
  const errorRepos = useSelector((state) => state.controler.errorRepos);

  const dispatch = useDispatch();

  //   Getting repos from selected user and sorting repos by created date
  useEffect(() => {
    axios
      .get(selectedUser.repos_url)
      .then((res) => {
        const responseData = [...res.data];
        responseData.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        dispatch(getSelectedUserRepos(responseData));
        console.log(res.data);
      })
      .catch(() => dispatch(setErrorRepos(true)));
  }, [dispatch, selectedUser]);

  return (
    <div className="RepoPage">
      <div className="RepoPage__container">
        <h1>{selectedUser.login}s repos</h1>
        {errorRepos ? null : (
          <div className="RepoPage__repos">
            {selectedUserRepos.map((repo) => {
              return (
                <div className="RepoPage__repo">
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

                  <div className="RepoPage__buttonContainer">
                    <a rel="noreferrer" target="_blank" href={repo.html_url}>
                      Open in new tab
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default RepoPage;
