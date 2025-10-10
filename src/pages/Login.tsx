import React, { useState } from "react";
import "../App.css";
import { InputField } from "../components/InputField";
import { SubmitButton } from "../components/SubmitButton";
import { Loader } from "../components/Loader";
import { encryptPassword } from "../utils/encryptPassword";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/userSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    const encrypted = await encryptPassword(password);

    try {
      // API link to your 
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: encrypted }),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(loginSuccess(email));
        navigate("/dashboard");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="h-screen w-full flex">

        <div className="bg-black rounded-r-[15px] h-full w-[50%] flex flex-col justify-center items-center gap-10">
          <div className="h-[250px] w-[250px]">
            <img src="/images/logo.png" alt="Logo" className="w-full h-full" />
          </div>
          <div className="text-white text-center leading-relaxed">
            <p>
              Login to your own personal shopping <br />
              assistant and start shopping smarter not <br />
              harder.
            </p>
          </div>
        </div>

 
        <div className="bg-white h-full w-[50%] flex flex-col justify-center items-center gap-8">
          <InputField
            typeInput="email"
            label="Email:"
            icon="/icons/email.png"
            placeholder="someone@example.com"
          />
          <div className="mt-2">
            <InputField
              typeInput="password"
              label="Password:"
              icon="/icons/lock.png"
              placeholder="Enter your password"
            />
          </div>

          <div className="mt-4">
            <SubmitButton text="Login" />
          </div>

          <button
            onClick={handleLogin}
            className="bg-black text-white w-[434px] h-[55px] rounded-[20px] mt-4 hover:bg-gray-800 transition"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
