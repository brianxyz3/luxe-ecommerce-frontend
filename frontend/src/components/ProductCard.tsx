import React from "react"
import { Link } from "react-router"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { productImg1 } from "@/assets/images"
import { useCart } from "@/context/CartContext"
import { toast } from "react-toastify"
import { useAuth } from "@/context/authContext"
import AvailableUnitTag from "./AvailableUnitTag"
import type { ProductType } from "@/types"

const ProductCard: React.FC<{product: ProductType; variant: "default" | "ghost"}> = ({product, variant}) => {

    const {updateCart} = useCart();
    const {currentUser} = useAuth();
    
  return (
    <Card key={product._id} className="relative rounded-2xl overflow-auto shadow flex flex-col justify-between hover:shadow-md min-w-[180px] md:min-w-52 w-full max-w-[275px]">
      
      <AvailableUnitTag units={product.units} />

      <Link
       onClick={() => (setTimeout(() => document.body.scroll({top: 0, behavior: "smooth"}), 50))}
       to={`/products/${product._id}`} className="h-full">
        {product.units < 1 && <div className="bg-gray-900/40 size-full absolute"></div>} {/* show out of stock products */}
        <img src={productImg1} alt="Product" className="rounded-t-2xl min-w-[135px] aspect-square" />
        <CardContent className="p-0 text-sm sm:text-base text-center flex flex-col justify-between">
          <h3 className="font-semibold truncate mx-1">{product.name}</h3>
          <p className="text-amber-600 font-bold">${product.price}</p>
        </CardContent>
      </Link>

      <Button 
        variant={variant}
          onClick={async () => {
            const item = {
                productId: product._id,
                productName: product.name,
                productBrandName: product.brandName,
                price: product.price,
                units: 0  
              }
              const guestId = localStorage.getItem("guestId") || "null";
              const {status, message} = await updateCart(currentUser?.id || guestId, item);
              if(status === 200) return toast.success(message);
              return toast.error(message);
              // toast.error("An Error Occurred, Try Again");
            
          }}
          className="my-2 px-3 py-1 h-fit bg-amber-500 hover:bg-amber-600 text-white md:w-3/4 block mx-auto w-fit text-sm sm:text-base">Add to Cart</Button>
    </Card>
  )
}

export default ProductCard