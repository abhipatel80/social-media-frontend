import React from "react";
import { useState, useRef } from "react";
import Overlay from "react-bootstrap/Overlay";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getSearchAsync } from "../../store/userSlice";
import { logout, url } from "../../api/userapi";
import LazyImage from "../LazyImage";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const { searchUsers } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const sendData = (e) => {
    setShow(true);
    if (e.target.value === "") {
      setShow(false);
    }
    dispatch(getSearchAsync(e.target.value));
  };

  const token = localStorage.getItem("token");

  const logoutuser = async () => {
    localStorage.clear();
    await logout();
  };

  return (
    <>
      <nav className="shadow-md h-[10%] flex items-center bg-white fixed top-0 w-full">
        <ul className="flex p-3">
          <NavLink to="/">
            <h2 className="md:text-2xl text-xl ml-4 cursor-pointer mr-4 mb-1 md:block hidden">
              Interwave
            </h2>
          </NavLink>
          <div className="mb-[-2rem] md:ml-20 ml-0 mt-[-12px]">
            <div className="md:ml-10 ml-4">
              <div className="relative -mx-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 absolute left-3 bottom-1/2 translate-y-1/2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  ></path>
                </svg>
                <input
                  type="search"
                  className="outline-none input bg-gray-100 border border-gray-300 md:w-[28rem] pl-10
                                    sm:w-[20rem] w-[10rem] rounded-3xl"
                  placeholder="    Search"
                  name="search"
                  id="search"
                  ref={target}
                  onClick={() => setShow(true)}
                  onChange={sendData}
                />
              </div>
            </div>
            <Overlay target={target.current} show={show} placement="bottom">
              {({
                placement: _placement,
                arrowProps: _arrowProps,
                show: _show,
                popper: _popper,
                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                ...props
              }) => (
                <div
                  {...props}
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    padding: "10px",
                    color: "black",
                    width: "18rem",
                    boxShadow: "0px 2px 20px 0px #e4e4e4",
                    left: "0",
                    borderRadius: 4,
                    ...props.style,
                  }}
                >
                  {searchUsers?.length <= 0 ? (
                    <>
                      <h2>No user found</h2>
                    </>
                  ) : (
                    <>
                      {searchUsers &&
                        searchUsers?.map((val) => {
                          return (
                            <>
                              <NavLink
                                to={`/profile/${val._id}`}
                                key={val._id}
                                onClick={() => setShow(false)}
                              >
                                <div className="flex items-center md:m-3 mx-1.5 my-4">
                                  <LazyImage
                                    src={`${url}${val.userImage}`}
                                    alt="User Profile"
                                    className="w-10 h-10 rounded-full mr-4 img-cover"
                                  />
                                  <h2 className="text-lg font-semibold">
                                    {val?.username}
                                  </h2>
                                </div>
                              </NavLink>
                            </>
                          );
                        })}
                    </>
                  )}
                </div>
              )}
            </Overlay>
          </div>
          <div className="ml-auto md:hidden block">
            {token ? (
              <NavLink to="/auth/login">
                <div className="">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-sm text-white py-1.5 px-2 rounded-md"
                    onClick={logoutuser}
                  >
                    Logout
                  </button>
                </div>
              </NavLink>
            ) : (
              ""
            )}
          </div>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
