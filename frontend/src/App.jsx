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
import { auth, firestoreDb } from "./firebase";
import { setUser, removeUser } from "./reducers/userReducer";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import "./Toastify.css";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import SavedRecipes from "./pages/SavedRecipes/SavedRecipes";
import MyRecipes from "./pages/MyRecipes/MyRecipes";
import UserPage from "./pages/UserPage/UserPage";
import { setSaved } from "./reducers/userReducer";
import SearchResult from "./pages/SearchResult/SearchResult";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = doc(firestoreDb, "users", user.uid);
        const getSaved = async () => {
          try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(setSaved(userData.saved ? userData.saved : []));
            }
          } catch (error) {
            console.error(error);
          }
        };
        getSaved();
        onSnapshot(userRef, (snapshot) => {
          const data = snapshot.data();
          dispatch(
            setUser({
              nickname: data.nickname,
              fullName: data.fullName,
              description: data.description,
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
        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route path="/profile/saved" element={<SavedRecipes />} />
        <Route path="/profile/myrecipes" element={<MyRecipes />} />
        <Route path="/constructor" element={<RecipeConstructor />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:category" element={<RecipesByCategory />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        <Route path="/users/:uid" element={<UserPage />} />
        <Route path="/search" element={<SearchResult />}/>
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
