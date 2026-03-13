import React from "react";
import "../App.css";

type Props = {
  typeInput: string;
  icon?: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export const InputField: React.FC<Props> = ({
  typeInput,
  icon,
  label,
  placeholder,
  value = "",
  onChange,
}) => {
  return (
    <div className="flex flex-col">
      <p className="text-[16px]">{label}</p>
      <div className="flex border border-gray-300 rounded-lg gap-2 w-[434px] h-[48px] px-3 focus-within:ring-2 focus-within:ring-black">
        {icon && <img src={icon} alt="" className="w-5 h-5 self-center opacity-70" />}
        <input
          type={typeInput}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full focus:outline-none bg-transparent"
        />
      </div>
    </div>
  );
};
