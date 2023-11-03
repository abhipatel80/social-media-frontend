import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/allNavigations/Navbar";
import Sidebar from "./components/allNavigations/Sidebar";
import MobileMenu from "./components/allNavigations/MobileMenu";
import Loading from "./components/Loading";
import { Suspense, lazy } from "react";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const HomePost = lazy(() => import("./pages/posts/HomePost"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const EditProfile = lazy(() => import("./pages/profile/EditProfile"));
const AddPost = lazy(() => import("./pages/posts/AddPost"));
const EditPost = lazy(() => import("./pages/posts/EditPost"));
const AllChat = lazy(() => import("./pages/messages/AllChat"));
const MobileSingleChat = lazy(() =>
  import("./pages/messages/MobileSingleChat")
);

const ChatMain = lazy(() => import("./pages/messages/ChatMain"));
const Explore = lazy(() => import("./pages/explore/Explore"));

const App = () => {
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");
  const checkpath = pathname.startsWith("/chat");

  return (
    <>
      {checkpath ? (
        ""
      ) : (
        <div>
          <Navbar />
        </div>
      )}
      <div className="flex">
        {!token || checkpath ? (
          ""
        ) : (
          <>
            <div className="md:block hidden mt-[4.2rem]">
              <Sidebar />
            </div>
            <div className="md:hidden block">
              <MobileMenu />
            </div>
          </>
        )}
        <div className="w-full items-center justify-center all-main-comp">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<HomePost />} />
              <Route path="/addpost" element={<AddPost />} />
              <Route path="/editpost/:id" element={<EditPost />} />
              <Route path="/explore" element={<Explore />} />

              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/editprofile" element={<EditProfile />} />

              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />

              <Route
                path="/chat"
                element={
                  <>
                    <div className="w-full md:hidden block">
                      <AllChat />
                    </div>
                    <div className="w-full md:block hidden">
                      <ChatMain />
                    </div>
                  </>
                }
              />
              <Route
                path="/chat/:id"
                element={
                  <div className="w-full md:hidden block">
                    <MobileSingleChat />
                  </div>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default App;
