import React from "react";
import "./SearchUserPage.css";
import axios from "axios";
import { Link } from "react-router-dom";

// Importing from Redux
import { useSelector, useDispatch } from "react-redux";
import { getUsers, getNewUser, selectUser } from "../../features/users";
import { setErrorSearch } from "../../features/controler";

function SearchUserPage() {
  // Selectors
  const users = useSelector((state) => state.users.users);
  const newUser = useSelector((state) => state.users.newUser);
  const errorSearch = useSelector((state) => state.controler.errorSearch);

  const dispatch = useDispatch();

  //   Searching user data from gitHub and updating state.
  const getNewUserHandler = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/${newUser.replace(" ", "").toLowerCase()}`)
      .then((res) => {
        // I didn't want to lose my searched users, so i copied an array and added new user. If I wanted to have only one user, I would just update getUsers with response.data.
        const allUsers = [...users];
        allUsers.unshift(res.data);
        dispatch(getUsers(allUsers));
        dispatch(getNewUser(""));
      })
      .catch(() => {
        // I could just pass the error and display the message, but I think that for the app user status 404 or 403 would not be of use.
        // If the app was bigger, I could make something like if(error === 404){message is that }, if(error === 403){message is something else} and etc...
        dispatch(setErrorSearch(true));
        dispatch(getNewUser(""));
        setTimeout(() => {
          dispatch(setErrorSearch(false));
        }, 3000);
      });
  };

  return (
    <div style={{ background: "#fafafa" }} className="SearchUserPage">
      <div className="SearchUserPage__container">
        <div>
          <form className="SearchUserPage__search">
            <input
              value={newUser}
              placeholder="Search GitHub User..."
              onChange={(e) => dispatch(getNewUser(e.target.value))}
            />
            <button type="submit" onClick={(e) => getNewUserHandler(e)}>
              Submit
            </button>
          </form>
          {/* This error will display if can't find the user we searched but it will disappear in 3 seconds */}
          {errorSearch ? (
            <div className="SearchUserPage__errorSearch">
              <h2>Error</h2>
              <p>
                User <strong>{newUser}</strong> not found.
              </p>
              <p>Please select diferent user.</p>
            </div>
          ) : null}
        </div>
        <div className="SearchUserPage__users">
          {users.map((usersData) => {
            return (
              // With a click on this link we are selecting the user, passing the values to redux state and redirecting to RepoPage.
              <Link
                key={usersData.id}
                onClick={() => dispatch(selectUser(usersData))}
                to="/userRepos"
                className="SearchUserPage__user"
              >
                <h3 style={{ textAlign: "center" }}>{usersData.login}</h3>
                <div className="SearchUserPage__img">
                  <img style={{ width: "100%" }} src={usersData.avatar_url} alt="avatar" />
                </div>
                <div className="SearchUserPage__userInfo">
                  {/* The users don't have description. Only org users(organisations) have description. The users have bio. The problem was, almost every user didn't fill his bio. */}
                  <p>
                    <strong>Bio: </strong>
                    {(usersData.bio || "This user didn't fill his bio.").split(/\s+/).slice(0, 12).join(" ")}
                  </p>
                  {/* I added created date because if the user didn't fill his bio, the card looks empty */}
                  <p>
                    <strong>Created:</strong> {new Date(usersData.created_at).toLocaleDateString("sr-RS")} at{" "}
                    {new Date(usersData.created_at).toLocaleTimeString("sr-RS")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchUserPage;
