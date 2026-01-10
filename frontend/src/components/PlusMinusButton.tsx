import { Minus, Plus } from "lucide-react";
import React from "react"

interface ButtonProps {
  quantity: number;
  availableUnits: number;
  plusQuantity: () => void;
  minusQuantity: () => void;
}
const PlusMinusButton: React.FC<ButtonProps> = ({quantity, plusQuantity, minusQuantity}) => {
  return (
    <div className="flex group">
      <button 
        title="decrease"
        disabled={!(quantity -1) }
        type="button" 
        className="quantity_btn text-red-600 border-2 border-red-600 active:bg-red-600 dark:border-red-900 dark:text-red-800 dark:active:bg-red-800 active:text-cream-light border-r-black px-1 duration-300"
        onClick={() => minusQuantity()}><Minus/></button>
      <p className="border-2 border-black group-active:text-gray-300 px-3 dark:border-gray-500 duration-150">{quantity}</p>
      <button 
        title="increase" 
        type="button" 
        className="quantity_btn text-green-600 border-2 border-green-600 active:bg-green-600 dark:text-green-800 dark:border-green-900 dark:active:bg-green-800 active:text-cream-light border-l-black px-1 duration-300"
        onClick={() => plusQuantity()}><Plus/></button>
    </div>
  )
}

export default PlusMinusButton