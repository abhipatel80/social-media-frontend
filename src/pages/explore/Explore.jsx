import React, { useEffect } from "react";
import { getPostAsync } from "../../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/postsComponent/Post";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const dispatch = useDispatch();
  const { allPosts: data } = useSelector((state) => state.post);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getPostAsync(1));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (!token) {
      navigate("/auth/login");
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="pt-16 bg-gray-50 h-screen overflow-auto">
      {data?.map((val) => {
        return <Post key={val._id} val={val} />;
      })}
    </div>
  );
};

export default Explore;
