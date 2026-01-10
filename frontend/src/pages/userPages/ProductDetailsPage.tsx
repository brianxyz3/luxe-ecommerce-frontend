import { heroModelImg, productImg1, productImg2, productImg3, productImg4 } from "@/assets/images"
import AvailableUnitTag from "@/components/AvailableUnitTag"
import PlusMinusButton from "@/components/PlusMinusButton"
import ProductsSlider from "@/components/ProductsSlider"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/authContext"
import { useCart } from "@/context/CartContext"
import useProductFetch from "@/controller/useProductFetch"
import type { CartType, ProductType } from "@/types"
import axios from "axios"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router"
import { toast } from "react-toastify"



const ProductDetailsPage = () => {
    const {productId} = useParams()
    const {currentUser} = useAuth();
    const {updateCart, cart} = useCart();
    const [showMore, setShowMore] = useState(false);
    const [product, setProduct] = useState<ProductType>({_id: "",
        name: "",
        brandName: "",
        description: "",
        category: [],
        type: [],
        units: 0,
        price: 0,});

    const [quantity, setQuantity] = useState<number>(1);

    useEffect (() => {
        axios.get(`/api/products/${productId}`).then(response => {
            setProduct(response.data)
            const productInCart = cart.filter(item => item.productId == productId)
            if(productInCart.length > 0) return setQuantity(productInCart[0].units);
            return setQuantity(1);
        })
    }, [productId]);


    

    const {productList} = useProductFetch(1, "", {category: product.category[1]});

    const isUnitDifferent = cart.some((item) => item.productId === productId && item.units !== quantity)
    
    const increaseQantity = () => setQuantity(prevVal => Math.min(prevVal + 1, product.units))
    const decreaseQantity = () => setQuantity(prevVal => prevVal - 1)

  return (
    <main className="px-2 sm:px-6 lg:px-12 py-6 bg-cream-light dark:bg-black">
        {/* Full Product Detail */}
        <section className="bg-white dark:bg-stone-700 px-3 py-6 sm:p-6 grid grid-cols-1 md:grid-cols-10 lg:grid-cols-11 gap-y-12 lg:gap-6 mb-8">
            <div className="w-full md:col-span-10 lg:col-span-3 xl:col-span-4 place-self-center h-full">

                {/* Product Image(s) */}
                <div>
                    <div className="relative">
                        {product.units <= 0 && <div className="absolute w-5/6 h-full bg-gray-200/25 flex justify-self-center items-center justify-center"><h3 className="font-semibold text-4xl truncate text-black origin-center">OUT OF STOCK</h3></div>}
                        <AvailableUnitTag units={product.units}/>
                        <img src={heroModelImg} className="w-60 mx-auto" alt="" />
                    </div>
                    {/* thumbnail from backend cloudinary */}
                    <div className="flex gap-2 md:gap-3 mt-4 h-20 w-4/5 md:w-3/5 lg:w-full mx-auto overflow-x-auto flex-nowrap">
                        <img src={productImg1} className="min-w-20" alt="" />
                        <img src={productImg1} className="min-w-20" alt="" />
                        <img src={productImg1} className="min-w-20" alt="" />
                        <img src={productImg1} className="min-w-20" alt="" />
                        <img src={productImg1} className="min-w-20" alt="" />
                        <img src={productImg3} className="min-w-20" alt="" />
                        <img src={productImg2} className="min-w-20" alt="" />
                        <img src={productImg3} className="min-w-20" alt="" />
                        <img src={productImg4} className="min-w-20" alt="" />
                    </div>
                </div>
            </div>

            {/* Product Title and Description */}
            <div className="md:col-span-6 lg:col-span-4 lg:pl-2 xl:pr-4">
                <h3 className="text-3xl tracking-wider font-bold mb-3">{product.name}</h3>
                <p className="text-xl font-bold mb-3">$ {product.price}</p>
                <h4 className="text-lg font-bold border-b border-red-600 w-fit mb-2 pb-1">About Item</h4>
                <div className="flex gap-x-6 mb-1 flex-wrap md:flex-nowrap">
                    <div className="flex gap-x-1">
                        <p className="text-gray-600 dark:text-gray-400">Brand:</p>
                        <p>{product.brandName}</p>
                    </div>
                    <div className="flex gap-x-1">
                        <p className="text-gray-600 dark:text-gray-400">Type:</p>
                        <p>{product.type[1]}</p>
                    </div>
                </div>
                <div className="flex gap-x-6 mb-3 flex-wrap md:flex-nowrap">
                    <div className="flex gap-x-1">
                        <p className="text-gray-600 dark:text-gray-400">Category:</p>
                        <p>{product.category[1]}</p>
                    </div>
                    <div className="flex gap-x-1">
                        <p className="text-gray-600 dark:text-gray-400">weight:</p>
                        <p>10g</p>
                    </div>
                </div>
                <p className="flex items-center my-3"><Star/> 4.9 Ratings * 2.3+ Reviews</p>

                <div className="product_description_container h-44 overflow-auto">
                    <button 
                        title="toggle view more" 
                        type="button" 
                        className="flex items-center gap-2 font-bold"
                        onClick={() => (setShowMore(prevVal => !prevVal))}
                        >
                        Description
                        <div className="relative">
                            <div className={`${showMore && "rotate-90"} h-0.5 w-2.5 bg-black absolute inset-0 origin-center duration-500`}></div>
                            <div className="h-0.5 w-2.5 bg-black absolute inset-0"></div>
                        </div>
                    </button>
                    <div className="details">
                        <div className={`${showMore && "open"} overflow-hidden leading-5`}>
                            {product.description}
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Product Section */}
            <div className="md:col-span-4 xl:col-span-3 h-full px-1 sm:px-3">
                <h2 className="text-2xl text-center font-bold mb-4">Set Order</h2>
                <div className="flex gap-x-3 items-center mb-4">
                    <div className="border-[12px] border-gray-400 rounded-2xl w-2/5 h-32 bg-white dark:bg-stone-700">
                        <img src={heroModelImg} className="w-full h-full rounded-sm" alt="" />
                    </div>
                    <div>
                        <p>Seleted Order</p>
                        <p className="font-bold">XL(Extra Large)</p>
                    </div>
                </div>
                <div className="text-lg mb-4">
                    <div className="flex justify-between mb-3">
                        <p>Quantity: </p>
                        <PlusMinusButton availableUnits={product.units} quantity={quantity} plusQuantity={increaseQantity} minusQuantity={decreaseQantity}/>
                    </div>
                    <div className="flex justify-between">
                        <p>Total: </p>
                        <p className="font-black">$ {Math.floor(product.price * quantity)}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-y-4">
                    <Button disabled={product.units <= 0} className="rounded-sm text-lg border-2 border-black h-12 dark:bg-black dark:text-white">Buy Now</Button>
                    <Button 
                    className="rounded-sm text-lg border-2 border-amber-500 h-12 font-bold bg-white dark:bg-stone-700 dark:text-white dark:border-white text-black hover:text-white"
                    onClick={ async() => {
                    const item: CartType = {
                        productId: product._id,
                        productName: product.name,
                        productBrandName: product.brandName,
                        price: product.price,
                        units: quantity
                    }
                    const guestId = localStorage.getItem("guestId") || "null";

                    const {status, message} = await updateCart(currentUser?.id || guestId, item);
                    if(status === 200) return toast.success(message);
                    return toast.error(message);
                }
                }
                    >{isUnitDifferent ? "Update" : "Add To"} Cart</Button>
                </div>
            </div>
        </section>
        
        {/* Product Review */}
        <section>
            <div className="px-3 sm:px-8 py-4 sm:text-lg tracking-wide font-bold bg-white dark:bg-stone-700 flex gap-4 sm:gap-8">
                {
                    ["Reviews", "Warranty", "Return Policy"].map((item, idx) => (
                        <NavLink to="/" key={idx} className="truncate">{item}</NavLink>
                    ))
                }
            </div>
            <div className="px-4 sm:px-8 py-4 mt-2 bg-white dark:bg-stone-700">
                <div className="grid grid-cols-5">
                    <div className="mb-3 col-span-2">
                        <h2 className="text-4xl tracking-wider font-black scale-y-125 lg:scale-y-150 mb-3 text-amber-400">4.8</h2>
                        <p className="text-gray-600 dark:text-gray-400">STARS</p>
                        <p className="text-gray-600 dark:text-gray-400">7 Reviews</p>
                    </div>
                    <div className="mb-3 col-span-3 text-sm sm:text-base">
                        <div>
                            5
                        </div>
                        <div>
                            4
                        </div>
                        <div>
                            3
                        </div>
                        <div>
                            2
                        </div>
                        <div>
                            1
                        </div>
                    </div>
                    {
                        [1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="col-span-5 grid grid-cols-5">
                                <div className="mb-3 col-span-2">
                                    <div className="flex items-center sm:gap-3">
                                        <div className="sm:size-16 aspect-square bg-black rounded-full"></div>
                                        <div className="text-sm sm:text-base">
                                            <p>Reviewer's Name</p>
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Date posted</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3 h-20 md:h-fit overflow-y-auto text-sm md:text-base sm:pt-2 mb-3">
                                    <p>STARZ</p>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cupiditate velit earum hic veritatis nisi iste cumque, quisquam numquam! Labore.</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>

        {/* Products in this Category */}
        <section className="py-4 px-4 mt-8 bg-white dark:bg-stone-700">
            <ProductsSlider heading="Products in this Category" productsArr={productList}/>
        </section>
    </main>
  )
}

export default ProductDetailsPage