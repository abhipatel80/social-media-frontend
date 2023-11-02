import React, { useEffect, useState } from "react";
import { change } from "../../utils/change";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { registerAsync } from "../../store/userSlice";

const Register = () => {
  const [input, setinput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [userImage, setuserImage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);

  const formData = new FormData();
  formData.append("username", input.username);
  formData.append("email", input.email);
  formData.append("password", input.password);
  formData.append("userImage", userImage);

  const submit = (e) => {
    e.preventDefault();
    dispatch(registerAsync(formData));
    if (typeof error !== "string") {
      navigate("/");
    }
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <>
      <div className="grid justify-items-center w-full m-10 mt-24">
        <form
          onSubmit={submit}
          className="shadow-lg px-10 min-w-[10rem] rounded-md py-7 bg-white"
        >
          <p className="text-red-600">
            {typeof error === "string" ? error : ""}
          </p>
          <div className="inputs">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              className="input"
              onChange={(e) => change(e, setinput)}
              placeholder="username"
              name="username"
              id="username"
            />
          </div>
          <div className="inputs">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              className="input"
              onChange={(e) => change(e, setinput)}
              placeholder="Email"
              name="email"
              id="email"
            />
          </div>
          <div className="inputs">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              className="input"
              onChange={(e) => change(e, setinput)}
              placeholder="password"
              name="password"
              id="password"
            />
          </div>
          <div className="inputs">
            <label htmlFor="Profile img">Profile Image</label>
            <input
              type="file"
              className="input"
              onChange={(e) => setuserImage(e.target.files[0])}
              name="image"
              id="image"
            />
          </div>
          <p>
            Already have an account ? &nbsp;
            <span className="text-blue-700 tracking-wide font-semibold">
              <NavLink
                to="/auth/login"
                className="hover:border-b-2 border-blue-600"
              >
                Login
              </NavLink>
            </span>
          </p>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1.5 rounded-md cursor-pointer mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
