import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { followUser, isUserFollow, unfollowUser } from "../../api/followapi";
import LazyImage from "../LazyImage";
import UserSkeleton from "../skeletons/UserSkeleton";
import { url } from "../../api/userapi";

const FollowerDialog = ({ val }) => {
  const [isFollow, setisFollow] = useState(false);

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
    <div className="modal-body max-h-[35rem] overflow-auto comment">
      <div className="flex w-full items-center">
        <NavLink to={`/profile/${val._id}`} key={val._id}>
          <div className="">
            <div className="flex items-center">
              {val.userImage === undefined ? (
                <UserSkeleton />
              ) : (
                <LazyImage
                  src={`${url}${val.userImage}`}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full mr-4 img-cover"
                />
              )}
              <h2 className="text-lg font-semibold">{val?.username}</h2>
            </div>
          </div>
        </NavLink>
        <div className="ml-auto">
          {!isFollow ? (
            <button
              onClick={() => follow(val._id)}
              className="font-normal tracking-wide bg-blue-600 hover:bg-blue-700 text-white 
                        text-xs rounded-md py-1.5 px-3"
            >
              Follow
            </button>
          ) : (
            <button
              onClick={() => unfollow(val._id)}
              className="font-normal tracking-wide bg-blue-600 hover:bg-blue-700 text-white 
                        text-xs rounded-md py-1.5 px-3"
            >
              Unfollow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowerDialog;
