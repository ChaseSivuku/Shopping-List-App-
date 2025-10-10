import React from "react";
import "../App.css";

type Props = {
  typeInput: string;
  icon?: string;
  label: string;
  placeholder?: string;
};

export const InputField: React.FC<Props> = ({
  typeInput,
  icon,
  label,
  placeholder,
}) => {
  return (
    <>
      <div className="flex flex-col">
        <p className="text-[16px]">{label}</p>
        <div tabIndex={0} className="flex border-1 gap-2 w-[434px]  h-[48px] focus:border-3">
          <img src={icon} alt="" />
          <input type={typeInput} placeholder={placeholder} className=" w-full focus:outline-none hover:bg-gray-100"/>
        </div>
      </div>
    </>
  );
};
