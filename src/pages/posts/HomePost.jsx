import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/postsComponent/Post";
import { getLikedPostsAsync } from "../../store/likeSlice";
import { getFollowersPostAsync } from "../../store/postSlice";
import { useNavigate } from "react-router-dom";
import { getAllUserAsync } from "../../store/userSlice";
import Loading from "../../components/Loading";
import FollowSuggestions from "../../components/FollowSuggestions";

const HomePost = () => {
  const dispatch = useDispatch();
  const { likedPost } = useSelector((state) => state.like);
  const { followersPost, loading } = useSelector((state) => state.post);
  const { allUsers } = useSelector((state) => state.user);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    dispatch(getLikedPostsAsync());
    dispatch(getFollowersPostAsync());
    dispatch(getAllUserAsync());
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // eslint-disable-next-line
  }, []);

  const [tabIndex, setTabIndex] = useState(0);

  const followCondition = followersPost?.length <= 0;
  const likeCondition = likedPost?.length <= 0;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className={`flex items-center overflow-scroll all-posts justify-center bg-gray-50 ${
          followCondition ? "pt-10" : "pt-60"
        } h-screen`}
      >
        <div
          className={`bg-white p-4 rounded shadow-sm ${
            followCondition ? "lg:w-[25rem]" : ""
          }`}
        >
          {followCondition ? (
            <>
              <h2 className="text-xl font-semibold">
                Follow your favourite person
              </h2>
              <div className="">
                {allUsers &&
                  allUsers?.map((val) => {
                    return <FollowSuggestions val={val} />;
                  })}
              </div>
            </>
          ) : (
            <>
              <div className="flex">
                <button
                  className={`flex-1 text-center py-2 ${
                    tabIndex === 0 ? "border-b-2 border-blue-500" : "border-b"
                  }`}
                  onClick={() => setTabIndex(0)}
                >
                  Followers Posts
                </button>
                {likeCondition ? (
                  ""
                ) : (
                  <button
                    className={`flex-1 text-center py-2 ${
                      tabIndex === 1 ? "border-b-2 border-blue-500" : "border-b"
                    }`}
                    onClick={() => setTabIndex(1)}
                  >
                    Liked Posts
                  </button>
                )}
              </div>
              <div className="h-screen overflow-scroll all-posts">
                {tabIndex === 0 &&
                  followersPost?.map((val) => {
                    return <Post val={val} key={val._id} loading={loading} />;
                  })}
                {tabIndex === 1 &&
                  likedPost?.map((val) => {
                    return <Post val={val} key={val._id} loading={loading} />;
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePost;
