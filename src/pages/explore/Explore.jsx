import React, { useEffect } from "react";
import { getPostAsync } from "../../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post";
import { useNavigate } from "react-router-dom";
// import Loading from "../../components/Loading";
// import InfiniteScroll from "react-infinite-scroll-component";

const Explore = () => {
  // const [page, setpage] = useState(1);

  const dispatch = useDispatch();
  const { allPosts: data } = useSelector((state) => state.post);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // const fetchData = () => {
  //   if (page <= 2) {
  //     setpage((page) => page + 1);
  //   }
  //   if (page > 1) {
  //     dispatch(addNewPost(...data));
  //   }
  //   dispatch(getPostAsync(page));
  // };

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
      {/* <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={data.length === 3 ? false : true}
        loader={
          <h4>
            <Loading />
          </h4>
        }
        height={520}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      > */}
        {data?.map((val) => {
          return <Post key={val._id} val={val} />;
        })}
      {/* </InfiniteScroll> */}
    </div>
  );
};

export default Explore;
