import React, { useEffect, useState } from "react";
import { addCommentAsync } from "../store/commentSlice";
import { useDispatch } from "react-redux";
import { addLike, deleteLike, isLikedPost } from "../api/likeapi";
import { deleteComment } from "../api/commentapi";
import { NavLink, useNavigate } from "react-router-dom";
import { followUser, isUserFollow, unfollowUser } from "../api/followapi";
import LazyImage from "./LazyImage";
import PostSkeleton from "./skeletons/PostSkeleton";
import UserSkeleton from "./skeletons/UserSkeleton";
import { url } from "../api/userapi";

const Post = ({ val, loading }) => {
  const [comment, setcomment] = useState();
  const [isComment, setIsComment] = useState(false);
  const [isLike, setisLike] = useState(false);
  const [isFollow, setisFollow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addcomment = (id) => {
    setIsComment(false);
    if (comment?.split("").length <= 3) return;
    else {
      dispatch(addCommentAsync({ postId: id, comment }));
    }
  };

  const id = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const delcomment = (id, postId) => {
    deleteComment(id, postId);
  };

  const addlike = async (id) => {
    await addLike(id);
    const data = await isLikedPost(id);
    setisLike(data);
  };

  const removelike = async (postId, id) => {
    await deleteLike(postId, id);
    const data = await isLikedPost(postId);
    setisLike(data);
  };

  useEffect(() => {
    const func = async () => {
      const data = await isLikedPost(val._id);
      setisLike(data);
    };
    func();
  }, [val._id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (!token) {
      navigate("/auth/login");
    }
    // eslint-disable-next-line
  }, [token]);

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
      const data = await isUserFollow(val.userId._id);
      setisFollow(data);
    };
    func();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div
        className="md:w-[30rem] sm:w-[24rem] shadow-sm w-full flex max-w-screen-md mx-auto"
        key={val?._id}
      >
        <div className="bg-white rounded-lg mt-2">
          <div className="flex items-center justify-between md:p-4 p-2.5">
            <NavLink to={`/profile/${val?.userId._id}`}>
              <div className="flex items-center">
                {val.userId.userImage === undefined || loading ? (
                  <UserSkeleton />
                ) : (
                  <LazyImage
                    src={`${url}${val.userId.userImage}`}
                    alt="user profile"
                    className="w-10 h-10 rounded-full md:mr-4 mr-3 img-cover"
                  />
                )}
                <h2 className="text-lg font-semibold ml-1">{val?.userName}</h2>
              </div>
            </NavLink>
            {val.userId._id === id ? (
              ""
            ) : isFollow ? (
              <button
                onClick={() => unfollow(val.userId._id)}
                className="text-blue-500 font-semibold md:text-base text-sm"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => follow(val.userId._id)}
                className="text-blue-500 font-semibold md:text-base text-sm"
              >
                Follow
              </button>
            )}
          </div>
          {val.postImage === undefined || loading ? (
            <PostSkeleton />
          ) : (
            <LazyImage
              src={`${url}${val.postImage}`}
              alt="Post"
              className="w-full h-64 max-h-72 img-cover md:rounded-lg rounded-sm"
            />
          )}
          <div className="px-4 py-2">
            <div className="flex flex-col">
              <div className="flex">
                {isLike ? (
                  <button
                    className="text-2xl mr-6 text-red-500"
                    onClick={() => removelike(val._id, id)}
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                ) : (
                  <button
                    className="text-2xl mr-6"
                    onClick={() => addlike(val._id)}
                  >
                    <i className="fa-regular fa-heart"></i>
                  </button>
                )}
                <button className="text-2xl" onClick={() => setIsComment(true)}>
                  <i className="fa-comment fa-regular"></i>
                </button>
                <div className="text-sm text-gray-500 ml-auto">
                  {val?.createdAt.slice(0, 10)}
                </div>
              </div>
              {isComment ? (
                <div className="mt-2 flex">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    onChange={(e) => setcomment(e.target.value)}
                    className="py-0.5 px-4 w-full border border-black rounded-md"
                  />
                  <button
                    className="bg-blue-600 px-3 font-semibold text-sm rounded-md text-white ml-4"
                    onClick={() => addcomment(val._id)}
                  >
                    Post
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="mt-2">
              <p className="text-sm">
                <span className="font-semibold">{val.totalLikes} likes</span>
              </p>
            </div>
          </div>

          <div className="px-4 mb-1">
            <p>
              <span className="font-semibold">{val?.userName}</span>{" "}
              {val?.caption}
            </p>
          </div>

          <div className="max-h-[8rem] home-comment mt-2">
            {val.comments.map((data, index) => {
              return (
                <div className="px-4 py-1" key={index}>
                  <div className="mb-1">
                    <p className="text-sm flex w-full">
                      <span className="font-semibold mr-2">{data?.name}</span>
                      {data?.comment}
                      {data?.userId === id ? (
                        <button
                          onClick={() => delcomment(data._id, val._id)}
                          className="ml-auto cursor-pointer hover:text-red-600"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      ) : null}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
