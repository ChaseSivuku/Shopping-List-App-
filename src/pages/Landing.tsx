import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export const Landing = () => {
  return (
    <div className="h-screen w-full bg-[url('/images/background.png')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[10px] flex flex-col items-center justify-center gap-12 text-center p-12">
        <h1 className="text-6xl font-bold text-white">Welcome</h1>
        <p className="text-white text-lg">
          Click our logo to get started with your first <br />
          step to smarter shopping
        </p>
        <Link to="/login">
          <button className="border-0 h-[250px] w-[250px]">
            <img src="/images/logo.png" alt="Logo" className="w-full h-full" />
          </button>
        </Link>
      </div>
    </div>
  );
};
