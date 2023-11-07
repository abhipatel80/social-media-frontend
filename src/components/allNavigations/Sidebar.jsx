import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../../api/userapi";
import ExploreIcon from "@mui/icons-material/Explore";

const Sidebar = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  const logoutuser = async () => {
    localStorage.clear();
    await logout();
  };

  return (
    <>
      <div className="main-menu w-60 p-8 h-[35.9rem] sticky left-0">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <div className="menu menu1">
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </div>
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <div className="menu menu1">
            <ExploreIcon className="mr-4" />
            <p>Explore</p>
          </div>
        </NavLink>
        <NavLink
          to="/addpost"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <div className="menu menu1">
            <i className="fa-solid fa-plus"></i>
            <p>Create</p>
          </div>
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <div className="menu menu1">
            <i className="fa-solid fa-comment"></i>
            <p>Messages</p>
          </div>
        </NavLink>
        <NavLink
          to={`/profile/${id}`}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <div className="menu menu1">
            <i className="fa-solid fa-user"></i>
            <p>Profile</p>
          </div>
        </NavLink>
        {token ? (
          <NavLink
            to="/auth/login"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="menu menu1">
              <i className="fa-solid fa-right-from-bracket"></i>
              <button onClick={logoutuser}>Logout</button>
            </div>
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Sidebar;
