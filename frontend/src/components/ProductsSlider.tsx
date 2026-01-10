import React from "react"
import ProductCard from "./ProductCard";
import type { ProductType } from "@/types";

interface ProductsSliderProps {
  heading: string;
  productsArr: ProductType[] | undefined;
}

const ProductsSlider: React.FC<ProductsSliderProps> = ({heading, productsArr}) => {
  return (
    <>
      <h4 className="text-2xl font-semibold mb-6">{heading}</h4>
      {productsArr ?
        <div className="flex flex-nowrap px-1 pb-4 gap-6 overflow-x-auto">
        {productsArr.map((product) => (
          <ProductCard key={product._id} product={product} variant="default"/>
        ))}
        </div>
      :  <div className="text-3xl pt-12 text-gray-300 font-bold text-center tracking-wider">No Product Found</div>
      }
    </>
  )
}

export default ProductsSlider