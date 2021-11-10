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
        console.log(res);
        const allUsers = [...users];
        allUsers.unshift(res.data);
        dispatch(getUsers(allUsers));
        dispatch(getNewUser(""));
      })
      .catch(() => {
        dispatch(setErrorSearch(true));
        dispatch(getNewUser(""));
        setTimeout(() => {
          dispatch(setErrorSearch(false));
        }, 3000);
      });
  };

  return (
    <div className="SearchUserPage">
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
              <Link onClick={() => dispatch(selectUser(usersData))} to="/userRepos" className="SearchUserPage__user">
                <h3>{usersData.login}</h3>
                <div className="SearchUserPage__img">
                  <img src={usersData.avatar_url} alt="avatar" />
                </div>
                <div className="SearchUserPage__userInfo">
                  <p>
                    <strong>Bio: </strong>
                    {(usersData.bio || "This user didn't fill his bio.").split(/\s+/).slice(0, 12).join(" ")}
                  </p>
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
