import React from 'react'
import "../App.css"

type Props = {
        typeInput: string,
        icon?: string,
        label: string
    }


export const InputField: React.FC <Props> = ({typeInput, icon, label}) => {

  return (
    <>
    <div className="flex flex-col">
        <p>{label}</p>
        <div className="flex border-1 w-fit">
        <input type={typeInput} />
        <img src={icon} alt="" />
        </div>
    </div>
    </>
  )
}
