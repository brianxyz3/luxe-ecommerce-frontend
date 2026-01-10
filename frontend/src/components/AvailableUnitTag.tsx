import { AlertOctagonIcon } from "lucide-react";
import React from "react";

const AvailableUnitTag: React.FC<{units: number}> = ({units}) => {
  return (
  <div className="absolute rounded-full m-1.5 overflow-hidden text-xs tracking-wide font-semibold text-white">
    {
    units > 0 && units <= 5 ?
        <div className="flex items-center gap-1 bg-red-600/70 p-1.5"><AlertOctagonIcon className="size-4"/> <p>Almost Out Of Stock</p></div>
    : units < 1 &&
        <div className="flex items-center gap-1 bg-red-200/40 p-1.5 text-red-600"><AlertOctagonIcon className="size-4 stroke-red-500"/> <p>Out Of Stock</p></div>
    }
  </div>
  )
}

export default AvailableUnitTag;