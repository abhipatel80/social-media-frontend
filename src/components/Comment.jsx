import React from "react";
import { deleteComment } from "../api/commentapi";
import LazyImage from "./LazyImage";
import PostSkeleton from "./skeletons/PostSkeleton";
import { url } from "../api/userapi";

const Comment = ({ data }) => {
  const userLocalId = localStorage.getItem("userId");

  const delcomment = (id, postId) => {
    deleteComment(id, postId);
  };

  return (
    <div className="comment md:h-[19rem] h-[13rem]">
      {data?.comments?.map((comment, id) => {
        return (
          <div key={id}>
            <div className="header flex mt-3 items-center ml-2">
              {data?.postImage === undefined ? (
                <PostSkeleton />
              ) : (
                <LazyImage
                  src={`${url}${data?.postImage}`}
                  alt="user post"
                  className="rounded-full w-12 h-12 cursor-pointer img-cover"
                />
              )}
              <div>
                <div className="flex w-full">
                  <p className="lg:text-xl text-lg font-semibold ml-4">
                    {comment?.name}
                  </p>
                  <p className="ml-5">
                    {comment?.userId === userLocalId ? (
                      <button
                        onClick={() => delcomment(comment._id, data._id)}
                        className="cursor-pointer hover:text-red-600"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    ) : null}
                  </p>
                </div>
                <p className="text font-semibold ml-4">{comment?.comment}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
