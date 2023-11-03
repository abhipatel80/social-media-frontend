import React, { useEffect, useState } from "react";
import { addNewPost, getPostAsync } from "../../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const Explore = () => {
  const [page, setpage] = useState(1);

  const dispatch = useDispatch();
  const { allPosts: data, loading } = useSelector((state) => state.post);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = () => {
    setpage((page) => page + 2);
    if (page > 2) {
      dispatch(addNewPost(...data));
    }
    dispatch(getPostAsync(page));
  };

  console.log("page", page);
  console.log("data", data);

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="pt-20 bg-gray-50 h-screen overflow-auto">
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={data.length <= 4}
        loader={
          <h4>
            <Loading />
          </h4>
        }
        height={500}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {data?.map((val) => {
          return <Post key={val._id} val={val} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Explore;
