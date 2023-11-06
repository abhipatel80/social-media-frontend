import React, { useEffect, useState } from "react";
import MyPost from "../../components/MyPost";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserAsync } from "../../store/userSlice";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getMyPostAsync } from "../../store/postSlice";
import FollowerDialog from "../../components/dialogs/FollowerDialog";
import { followUser, isUserFollow, unfollowUser } from "../../api/followapi";
import Loading from "../../components/Loading";
import LazyImage from "../../components/LazyImage";
import UserSkeleton from "../../components/skeletons/UserSkeleton";
import { url } from "../../api/userapi";

const Profile = () => {
  const [isFollow, setisFollow] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = localStorage.getItem("userId");

  const { singleUser: data, userLoading } = useSelector((state) => state.user);
  const { myPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getSingleUserAsync(id));
    dispatch(getMyPostAsync(id));
    // eslint-disable-next-line
  }, [id]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
    // eslint-disable-next-line
  }, [token]);

  const follow = async () => {
    await followUser({ followerId: data._id });
    const mydata = await isUserFollow(data._id);
    setisFollow(mydata);
  };

  const unfollow = async () => {
    await unfollowUser({ followerId: data._id });
    const mydata = await isUserFollow(data._id);
    setisFollow(mydata);
  };

  useEffect(() => {
    const func = async () => {
      const mydata = await isUserFollow(data._id);
      setisFollow(mydata);
    };
    func();
    // eslint-disable-next-line
  }, [data._id]);

  if (userLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="profile w-full grid justify-items-center mt-28 md:h-[33rem] h-[25rem] overflow-auto">
        <div className="profile_header flex items-center">
          <div className="img_section md:w-48 w-20 mr-4 md:mr-10">
            {data?.userImage?.startsWith("https") ? (
              <LazyImage
                src={`${data?.userImage}`}
                alt="user profile"
                className="rounded-full md:w-48 md:h-48 w-20 h-20 ml-3 img-cover"
              />
            ) : (
              <UserSkeleton />
            )}
          </div>
          <div className="username_section">
            <div className="md:text-2xl text-xl font-semibold mb-2 ml-5 mr-10">
              {data?.username}
              <span>
                {id === userId ? (
                  <NavLink to="/editprofile">
                    <i className="fa-solid font-normal hover:text-green-500 fa-pen-to-square md:ml-20 ml-8"></i>
                  </NavLink>
                ) : !isFollow ? (
                  <button
                    onClick={follow}
                    className="md:ml-20 ml-4 font-normal tracking-wide bg-blue-600 hover:bg-blue-700 text-white md:text-sm text-xs rounded-md py-1.5 px-3"
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={unfollow}
                    className="md:ml-20 ml-4 font-normal tracking-wide bg-blue-600 hover:bg-blue-700 text-white md:text-sm text-xs rounded-md py-1.5 px-3"
                  >
                    Unfollow
                  </button>
                )}
              </span>
            </div>

            <div className="flex justify-around md:w-85 w-64 font-semibold md:text-lg">
              <div className="text-center">
                <p>{myPosts.length}</p>
                <p>posts</p>
              </div>
              <div
                className="text-center"
                data-bs-toggle="modal"
                data-bs-target="#followModal"
              >
                <p className="cursor-pointer">{data?.followers?.length}</p>
                <p className="cursor-pointer">followers</p>
                <div
                  className="modal fade"
                  id="followModal"
                  tabIndex="-1"
                  aria-labelledby="followModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      {data?.followers?.map((val) => {
                        return <FollowerDialog val={val} key={val._id} />;
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="text-center"
                data-bs-toggle="modal"
                data-bs-target="#followingModal"
              >
                <p className="cursor-pointer">{data?.following?.length}</p>
                <p className="cursor-pointer">following</p>
                <div
                  className="modal fade"
                  id="followingModal"
                  tabIndex="-1"
                  aria-labelledby="followingModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      {data?.following?.map((val) => {
                        return <FollowerDialog val={val} key={val._id} />;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bio_section font-semibold md:w-[20rem] ml-4 mt-4">
              <p>{data?.bio}</p>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <hr className="mb-10" />
          <MyPost />
        </div>
      </div>
    </>
  );
};

export default Profile;
