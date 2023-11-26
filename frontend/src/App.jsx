import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import NoPage from "./pages/NoPage/NoPage";
import SignIn from "./pages/SignInUp/SignIn";
import SignUp from "./pages/SignInUp/SignUp";
import RecipeConstructor from "./pages/RecipeConstructor/RecipeConstructor";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Profile from "./pages/Profile/Profile";
import RecipesByCategory from "./pages/RecipesByCategory/RecipesByCategory";
import RecipePage from "./pages/RecipePage/RecipePage";
import { Sugar } from "react-preloaders2";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { db } from "./firebase";
import { onValue, ref } from "firebase/database";
import { setUser, removeUser } from "./reducers/userReducer";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Toastify.css";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = ref(db, "users/" + user.uid);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          dispatch(
            setUser({
              nickname: data.nickname,
              fullName: data.fullName,
              email: user.email,
              uid: user.uid,
            })
          );
        });
        setLoading(false);
      } else {
        dispatch(removeUser());
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/constructor" element={<RecipeConstructor />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:category" element={<RecipesByCategory />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
      <Sugar
        customLoading={loading}
        background="var(--dark-grey)"
        color="var(--white)"
      />
      <ToastContainer
        style={{ maxWidth: "45vw" }}
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
