import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import AddReviewPage from "./pages/AddReviewPage";
import AllReviews from './pages/AllReviews';
import MainPage from "./pages/MainPage";
import UpdateReviewPage from "./pages/UpdateReviewPage";
import ChangePassword from "./pages/changePassword";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const {user} = useContext(UserContext);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <MainPage /> : <Login />} />
      </Routes>
      <Routes>
        <Route path="/register" element={user ? <MainPage /> : <Register />} />
      </Routes>  
      <Routes>
        <Route path="/movies" element={user ? <MainPage /> : <Login/>} />
      </Routes>
      <Routes>
        <Route path="/writeReviews" element={user ? <AddReviewPage /> : <Login/>} />
      </Routes>  
      <Routes>
        <Route path="/updateReview" element={user ? <UpdateReviewPage /> : <Login/>} />
      </Routes>  
      <Routes>
        <Route path="/allReviews" element={user ? <AllReviews /> : <Login/>} />
      </Routes>  
      <Routes>
        <Route path="/changePassword" element={<ChangePassword/>} />
      </Routes>  
    </Router>
  );
}

export default App;
