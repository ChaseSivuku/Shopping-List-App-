import React from "react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4 shadow-xl">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    </div>
  );
};
