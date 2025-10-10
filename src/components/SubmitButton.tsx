import React from 'react'

type Props = {
    text: string,
    color?: string,
}

export const SubmitButton:React.FC <Props> = ({text , color = "black"}) => {
    if(color === "black"){
        return (
    <>
         <button className={`border-1 w-[434px] h-[55px] rounded-[20px] bg-black hover:cursor-pointer text-white hover:bg-gray-900`}>{text}</button>
    </>
  )
    }else{
        return (
    <>
         <button className={`border-1 w-[434px] h-[55px] rounded-[20px] bg-white hover:cursor-pointer text-black hover:bg-gray-100`}>{text}</button>
    </>
  )
    }
  
}
