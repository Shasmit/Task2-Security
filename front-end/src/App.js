import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { UserContext } from "./context/UserContext";
import AddReviewPage from "./pages/AddReviewPage";
import AllReviews from './pages/AllReviews';
import { ErrorPage } from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import UpdateReviewPage from "./pages/UpdateReviewPage";
import ChangePassword from "./pages/changePassword";
import ForgotPassword from "./pages/forgotPassword";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const {user} = useContext(UserContext);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage /> } />
      </Routes>
      <Routes>
        <Route path="/login" element={user ? <MainPage /> : <Login />} />
      </Routes>
      <Routes>
        <Route path="/please-login" element={<ErrorPage /> } />
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
      <Routes>
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
      </Routes>  
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>  
    </Router>
  );
}

export default App;
