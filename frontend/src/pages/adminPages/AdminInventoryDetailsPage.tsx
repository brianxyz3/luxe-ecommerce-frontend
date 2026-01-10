import { heroModelImg, productImg1, productImg2, productImg3, productImg4 } from "@/assets/images"
import AvailableUnitTag from "@/components/AvailableUnitTag"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/authContext"
import type { InventoryDataType } from "@/types"
import axios from "axios"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"



const AdminInventoryDetailsPage = () => {
    const {inventoryId} = useParams()
    const navigate = useNavigate();
    const {currentUser} = useAuth();
    const [showMore, setShowMore] = useState(false);
    const [showReStockInput, setShowReStockInput] = useState(false);
    const [stock, setStock] = useState(0);
    const [inventory, setInventory] = useState<InventoryDataType | undefined>(undefined);

    useEffect(() => {
        axios.get(`/api/inventory/${inventoryId}`).then(({data}) => {
            setInventory(data.inventory)
            setStock(data.inventory.product.units)
        })
    }, [inventoryId]);

    const handleInventoryDelete = () =>  {
        if(inventory) {
            axios({
                method: "DELETE",
                headers: {"auth": `bearer- ${currentUser?.token}`},
                url: `/api/inventory/${inventory._id}/delete`,
            }).then(({data}) => {
                toast.success(data.message);
                navigate("/admin/inventory")
            }).catch((err) => {
                console.error(err)
                toast.error("Something went wrong, try again")
            })
        } else {
            toast.error("An error occurred. Check your internet connection, try again")
        }
    }


  return (
    <main className="flex-1 px-2 sm:px-6 lg:px-12 py-6 bg-cream-light dark:bg-black">
        {/* Full Product Detail */}
        {inventory && <> <section className="bg-white dark:bg-stone-700 px-3 py-6 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-8 mb-8">
            <div className="w-full lg:col-span-1 place-self-center h-full">

                {/* Product Image(s) */}
                <div className="relative">
                    {inventory.product.units <= 0 && <div className="absolute w-5/6 h-full bg-gray-200/25 flex justify-self-center items-center justify-center"><h3 className="font-semibold text-4xl truncate text-red-600/90 origin-center">OUT OF STOCK</h3></div>}
                    <AvailableUnitTag units={inventory.product.units}/>
                    <img src={heroModelImg} className="w-60 mx-auto" alt="" />
                    <div className="flex gap-2 md:gap-3 mt-4 h-20 w-4/5 md:w-3/5 lg:w-full mx-auto overflow-x-auto flex-nowrap">
                        <img src={productImg4} className="min-w-20" alt="" />
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
            <div className="lg:col-span-1">
                <div className="flex justify-between gap-4">
                    <h3 className="text-3xl tracking-wider font-bold mb-3">{inventory?.product.name}</h3>
                    <Button onClick={handleInventoryDelete} variant={"destructive"} className="hidden md:flex">
                        Delete
                    </Button>
                </div>
                <p className="text-xl font-bold mb-3">₦ {inventory?.product.price}</p>
                <h4 className="text-lg font-bold border-b border-red-600 w-fit mb-2 pb-1">About Item</h4>
                <div className="flex gap-x-6 mb-1 flex-wrap md:flex-nowrap">
                    <div className="flex gap-x-1">
                        <p className="text-gray-600 dark:text-gray-400">Brand:</p>
                        <p>{inventory?.product.brandName}</p>
                    </div>
                    <div className="flex gap-x-1">
                        <p className="text-gray-600 dark:text-gray-400">Type:</p>
                        <p>{inventory?.product.type[1]}</p>
                    </div>
                </div>
                <div className="flex gap-x-6 mb-3 flex-wrap md:flex-nowrap">
                    <div className="flex gap-x-1">
                        <p className="text-gray-600 dark:text-gray-400">Category:</p>
                        <p>{inventory?.product.category[1]}</p>
                    </div>
                    <div className="flex gap-x-1">
                        <p className="text-gray-600 dark:text-gray-400">weight:</p>
                        <p>10g</p>
                    </div>
                </div>
                <div className="flex gap-x-6 font-bold text-gray-700 dark:text-gray-500">
                    <p>Available Units: <span className="font-normal text-black dark:text-white">{inventory?.product.units}</span></p>
                    <p>Sold Units: <span className="font-normal text-black dark:text-white">{inventory?.unitsSold}</span></p>
                </div>
                <div className="flex items-center my-3"><Star/> 4.9 Ratings * 2.3+ Reviews</div>


                <div className="product_description_container h-24 overflow-auto">
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
                            {inventory?.product.description}
                        </div>
                    </div>
                </div>
                {/* Manage Product Section */}
                <div className="flex gap-2 md:gap-4">
                    <Input
                        type="number"
                        value={`${stock}`}
                        onChange={(evt) => setStock(parseInt(evt.target.value))}
                        className={`${showReStockInput ? "w-10 md:w-9 justify-center p-2" : "w-0 p-0"} origin-left transition-all duration-500 overflow-hidden`}
                    />
                    <Button variant={"default"}
                    className={`${showReStockInput ? "w-20 truncate" : "w-44"} origin-right transition-all duration-500 overflow-hidden`}
                    onClick={() => {
                        if(showReStockInput && stock != inventory?.product.units) {
                            if(stock >= 0) {
                                axios({
                                    method: "PUT",
                                    url: `/api/inventory/${inventory?.product._id}/reStockInventory`,
                                    headers: {"auth": `Bearer- ${currentUser?.token}`},
                                    data: {units: stock}
                                }).then(({data}) => {
                                    toast.success(data.message);
                                    setInventory(currValue => {
                                        if(currValue) return {...currValue, product: { ...inventory.product, units: stock}}
                                        return undefined
                                    })
                                    setShowReStockInput(false);
                                })
                            } else {
                                toast.error("Invalid input")
                            }
                        } else {
                            setShowReStockInput(!showReStockInput);
                        }
                    }}>
                        {showReStockInput ? "Update"
                        :"Re-Stock Inventory"}
                    </Button>
                    <Link to={`/admin/inventory/${inventory?._id}/edit`}>
                        <Button variant={"secondary"}>
                            Edit Product
                        </Button>
                    </Link>
                    <Button onClick={handleInventoryDelete} variant={"destructive"} className="md:hidden flex">
                        Delete
                    </Button>
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
        </section></>}
    </main>
  )
}

export default AdminInventoryDetailsPage;