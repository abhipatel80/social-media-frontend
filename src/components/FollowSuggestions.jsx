import React, { useEffect, useState } from "react";
import { followUser, isUserFollow, unfollowUser } from "../api/followapi";
import { NavLink } from "react-router-dom";
import LazyImage from "./LazyImage";
import UserSkeleton from "./skeletons/UserSkeleton";

const AllUsers = ({ val }) => {
  const [isFollow, setisFollow] = useState(false);

  const userId = localStorage.getItem("userId");

  const follow = async (followerId) => {
    await followUser({ followerId });
    const data = await isUserFollow(followerId);
    setisFollow(data);
  };

  const unfollow = async (followerId) => {
    await unfollowUser({ followerId });
    const data = await isUserFollow(followerId);
    setisFollow(data);
  };

  useEffect(() => {
    const func = async () => {
      const data = await isUserFollow(val._id);
      setisFollow(data);
    };
    func();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {val._id === userId ? null : (
        <div className="flex w-full items-center">
          <NavLink
            to={`/profile/${val._id}`}
            className="flex m-2 w-full items-center"
          >
            {val?.userImage?.startsWith("https") ? (
              <LazyImage
                src={`${val?.userImage}`}
                alt="User Profile"
                className="w-12 h-12 rounded-full mr-4 img-cover"
              />
            ) : (
              <UserSkeleton />
            )}
            <h2 className="text-lg font-semibold">{val?.username}</h2>
          </NavLink>
          <div className="">
            {isFollow ? (
              <button
                onClick={() => unfollow(val._id)}
                className="ml-auto font-normal tracking-wide bg-blue-600 hover:bg-blue-700
                        text-white text-xs rounded-md py-1.5 px-3"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => follow(val._id)}
                className="ml-auto font-normal tracking-wide bg-blue-600 hover:bg-blue-700
                        text-white text-xs rounded-md py-1.5 px-3"
              >
                Follow
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
