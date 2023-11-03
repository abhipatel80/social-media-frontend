import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePostAsync } from "../../store/postSlice";
import { addCommentAsync } from "../../store/commentSlice";
import Comment from "../Comment";
import { NavLink } from "react-router-dom";
import { deletePost } from "../../api/postapi";
import { addLike, deleteLike, isLikedPost } from "../../api/likeapi";
import LazyImage from "../LazyImage";
import PostSkeleton from "../skeletons/PostSkeleton";
import UserSkeleton from "../skeletons/UserSkeleton";
import { url } from "../../api/userapi";

const Dialog = ({ val }) => {
  const [comment, setcomment] = useState("");
  const [isLike, setisLike] = useState(false);

  const { singlePost: data, loading } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");

  const getpostdata = (id) => {
    dispatch(getSinglePostAsync(id));
  };

  const addcomment = (id) => {
    dispatch(addCommentAsync({ postId: id, comment }));
    setcomment("");
  };

  const addlike = async (id) => {
    await addLike(id);
    const mydata = await isLikedPost(id);
    setisLike(mydata);
  };

  const removelike = async (postId) => {
    await deleteLike(postId, userId);
    const mydata = await isLikedPost(postId);
    setisLike(mydata);
  };

  useEffect(() => {
    const func = async () => {
      const mydata = await isLikedPost(val._id);
      setisLike(mydata);
    };
    func();
    // eslint-disable-next-line
  }, [val._id]);

  return (
    <>
      <div>
        <div className="relative">
          <div
            data-bs-toggle="modal"
            onClick={() => getpostdata(val._id)}
            data-bs-target="#postModal"
          >
            {val.postImage === undefined || loading ? (
              <PostSkeleton />
            ) : (
              <LazyImage
                src={`${url}${val?.postImage}`}
                alt="user post"
                className="md:w-80 md:h-48 h-32 w-40 m-2 cursor-pointer img-cover rounded-md"
              />
            )}
          </div>
          {val.userId._id === userId ? (
            <>
              <NavLink to={`/editpost/${val?._id}`}>
                <button className="absolute top-1 right-0 rounded-md py-2 px-4 text-white">
                  <i className="fa-solid hover:text-green-500 fa-pen-to-square"></i>
                </button>
              </NavLink>
              <button className="absolute top-1 right-9 rounded-md py-2 px-4 text-white">
                <i
                  onClick={() => deletePost(val._id)}
                  className="fa-solid hover:text-red-500 fa-trash"
                ></i>
              </button>
            </>
          ) : (
            ""
          )}
        </div>

        <div
          className="modal fade"
          id="postModal"
          tabIndex="-1"
          aria-labelledby="postModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-body lg:flex">
                <div className="post-image lg:w-[60%]">
                  <div
                    data-bs-dismiss="modal"
                    className="absolute text-sm right-2 top-3 text-red-500"
                  >
                    <i className="fa-solid fa-circle-xmark fa-2xl"></i>
                  </div>
                  {data.postImage === undefined || loading ? (
                    <PostSkeleton />
                  ) : (
                    <LazyImage
                      src={`${url}${data?.postImage}`}
                      alt="user post"
                      className="lg:h-[34rem] cursor-pointer img-cover"
                    />
                  )}
                </div>
                <div className="post-caption flex flex-col lg:mt-0 mt-8">
                  <div className="header flex mb-3 items-center ml-8">
                    {data?.userId?.userImage === undefined || loading ? (
                      <UserSkeleton />
                    ) : (
                      <LazyImage
                        src={`${url}${data?.userId?.userImage}`}
                        alt="user post"
                        className="rounded-full w-12 h-12 cursor-pointer img-cover"
                      />
                    )}
                    <div>
                      <p className="lg:text-xl text-lg w-full flex font-semibold ml-4">
                        {data?.userName}
                      </p>
                      <p className="lg:text-md text-sm font-semibold ml-4">
                        {data?.caption}
                      </p>
                    </div>
                  </div>
                  <hr className="w-full" />
                  <Comment data={data} />
                  <hr className="w-full mt-10" />
                  <div className="likes flex text-center mt-3">
                    <div className="mx-8">
                      {isLike ? (
                        <button
                          className="text-red-500"
                          onClick={() => removelike(val._id)}
                        >
                          <i className="fas fa-heart fa-xl"></i>
                        </button>
                      ) : (
                        <button className="" onClick={() => addlike(val._id)}>
                          <i className="fa-regular fa-xl fa-heart"></i>
                        </button>
                      )}
                      <p>{data?.totalLikes}</p>
                    </div>
                    <div>
                      <i className="fa-regular fa-comment fa-xl"></i>
                      <p>{data?.totalComments}</p>
                    </div>
                  </div>
                  <hr className="w-full mt-2" />
                  <div className="footer">
                    <div className="flex mt-3">
                      <input
                        type="text"
                        value={comment}
                        onChange={(e) => setcomment(e.target.value)}
                        className="pl-4 w-[23rem] py-2 outline-none"
                        placeholder="Add a comment..."
                        name="comment"
                        id="comment"
                      />
                      <button
                        onClick={() => addcomment(data._id)}
                        className=" ml-4 text-blue-700 tracking-wide font-bold"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialog;
