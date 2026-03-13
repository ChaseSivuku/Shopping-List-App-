import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export const Landing = () => {
  const [logoError, setLogoError] = useState(false);
  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-800 to-black bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex flex-col items-center justify-center gap-12 text-center p-12">
        <h1 className="text-6xl font-bold text-white">Welcome</h1>
        <p className="text-white text-lg">
          Click below to get started with your first <br />
          step to smarter shopping
        </p>
        <Link to="/login">
          <button className="border-0 h-[250px] w-[250px] rounded-2xl overflow-hidden bg-white/10 hover:bg-white/20 transition flex items-center justify-center">
            {logoError ? (
              <span className="text-8xl" aria-hidden>🛒</span>
            ) : (
              <img
                src="/images/logo.png"
                alt="Shopping List App Logo"
                className="w-full h-full object-contain"
                onError={() => setLogoError(true)}
              />
            )}
          </button>
        </Link>
        <p className="text-white/80 text-sm">
          New here? <Link to="/register" className="underline font-medium">Create an account</Link>
        </p>
      </div>
    </div>
  );
};
