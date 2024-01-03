import axios from "axios";
import { useState } from "react";
import Bg from "../assets/images/bg2.jpg";
import Logo from "../assets/images/filmcratebg.png";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    setError(""); // Reset the error state before making the API call

    // Perform form validation
    if (username.trim() === "") {
      setError("Username is required");
      return;
    }

    if (email.trim() === "") {
      setError("Email is required");
      return;
    }

    if (password.trim() === "") {
      setError("Password is required");
      return;
    }

    if (confirmPassword.trim() === "") {
      setError("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:3001/users/register", {
        username,
        email,
        password,
        confirmPassword,
      })
      .then((response) => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMessage("user created successfully");
        window.location.href = "/";
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-[#F6F7D3]">
      <div className="bg-[#F6F7D3] hidden lg:block w-full md:w-1/2 xl:w-2/3">
        <img
          src={Bg}
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-[#F6F7D3] w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 px-6 lg:px-16 xl:px-12 flex items-center justify-center my-4">
        <div className="w-full h-100">
          <img src={Logo} alt="Logo" className="relative -left-4" />
          <h1 className="text-4xl md:text-4xl font-bold leading-tight mt-3 mb-2 texts">
            REGISTER
          </h1>
          <h2 className="text-3xl md:text-3xl font-medium leading-tight texts">
            JOIN US FOR FULL MASTI
          </h2>

          <form className="mt-3 bg-[#F6F7D3]" action="#" method="POST">
            <div>
              <label className="block text-[#305973] text-3xl texts">
                Username
              </label>
              <Input
                type="text"
                placeholder="Enter your username"
                autoFocus
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-[#305973] text-3xl mt-2 texts">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-2">
              <label className="block text-[#305973] text-3xl texts">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your Password"
                minLength="6"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <label className="block text-[#305973] text-3xl texts">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Re-Enter your password"
                minLength="6"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-xl mt-2">{error}</p>}
            {message && <p className="text-green-500 text-xl mt-2">{message}</p>}

            <Button text="REGISTER" onClick={handleSignup} />
          </form>
        </div>
      </div>
    </section>
  );
}
