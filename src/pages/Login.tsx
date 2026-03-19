import React, { useState } from "react";
import "../App.css";
import { InputField } from "../components/InputField";
import { Loader } from "../components/loader";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../store/userSlice";
import { selectUsers } from "../features/usersSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logoError, setLogoError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (user) {
        dispatch(loginSuccess({ email: user.email, userId: user.id }));
        navigate("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {/* left half */}
      {loading && <Loader />}
      <div className="h-screen w-full flex">
        <div className="bg-black rounded-r-[15px] h-full w-[50%] flex flex-col justify-center items-center gap-10">
          <div className="h-[250px] w-[250px] flex items-center justify-center bg-white/5 rounded-2xl">
            {logoError ? (
              <span className="text-white/60 text-sm">Logo</span>
            ) : (
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-full h-full object-contain"
                onError={() => setLogoError(true)}
              />
            )}
          </div>
          <div className="text-white text-center leading-relaxed">
            <p>
              Login to your own personal shopping <br />
              assistant and start shopping smarter not <br />
              harder.
            </p>
          </div>
        </div>
{/* Right half */}
        <div className="bg-white h-full w-[50%] flex flex-col justify-center items-center gap-8">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col items-center gap-6">
            <InputField
              typeInput="email"
              label="Email:"
              icon="/icons/icons8-email-50.png"
              placeholder="someone@example.com"
              value={email}
              onChange={setEmail}
            />
            <InputField
              typeInput="password"
              label="Password:"
              icon="/icons/padlock.png"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
            />
            {error && (
              <p className="text-red-600 text-sm w-[434px]">{error}</p>
            )}
            <button
              type="submit"
              className="bg-black text-white w-[434px] h-[55px] rounded-[20px] mt-4 hover:bg-gray-800 transition font-medium"
            >
              Login
            </button>
          </form>
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-black font-medium underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
