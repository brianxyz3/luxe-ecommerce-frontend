import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios";
import { type ProductType, type CartType } from "@/types";

//     const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const OrderSchema = new Schema(
//   {
//     cart: [
//       {
//         productId: {
//           type: Schema.Types.ObjectId,
//           ref: "Product",
//         },
//         productImg: String,
//         price: {
//           type: Number,
//         },
//         units: {
//           type: Number,
//         },
//       },
//     ],

//   },
// );

const orderStatus = ["Pending", "Cancelled", "Completed"];

const paymentOptions = [
    "payment on delivery",
    "cryptocurrency transfer",
    "bank transfer",
    "cash at retail store",
    ];

const AdminAddOrderPage = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [ showSearchResult, setShowSearchResult] = useState(false);
    const [ searchResult, setSearchResult] = useState<ProductType[] | undefined>([])
    const [ searchedProduct, setSearchedProduct] = useState<ProductType>()
    const [productName, setProductName] = useState("")
    const [orderCartData, setOrderCartData] = useState<CartType[]>([])
    const [units, setUnits] = useState(0)
    const [orderFormData, setOrderFormData] = useState({
        orderBy: currentUser?.id,
        status: "",
        paymentOption: "",
        address: "nil"
    });

    useEffect(() => {
        if(currentUser?.userRole !== "admin") {
            navigate("/auth")
            return
        }
    }, []);


    // const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     setOrderFormData({ ...orderFormData, [e.target.name]: e.target.value} );
    // };

    const handleSearch = () => {
        if(!productName) return toast.error("Enter valid search query")
        setShowSearchResult(true);
        axios.get("/api/products", { params: { searchInput: productName }})
        .then(({data}) => {
        if(!data.products) {
            setSearchResult(undefined)
        } else {
            setSearchResult([...data.products])
        }
        })
        .catch(err => {console.log("Something Went Wrong "+ err)})
    }



    const submitAddForm = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (currentUser?.userRole === "admin") {
            axios({
                method: "POST",
                url: "/api/orders/admin/add",
                headers: {
                    "auth": `Bearer- ${currentUser?.token}`,
                },
                data: {
                    cart: orderCartData,
                    ...orderFormData
                }
            }).then(({data}) => {
                toast.success(data.message);
                return;
            }).catch(error => {
                toast.error(error.response.data.message)
                return;
            })
        } else {
            navigate("/auth");
        };
    };


    return (
        <>
        <section className="bg-cream-lighter dark:bg-stone-700 w-full">
            <div className="container m-auto max-w-xl py-24">
                <div
                    className="bg-cream-light dark:bg-amber-900/15 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <form onSubmit={submitAddForm}>
                    <h2 className="text-3xl text-center font-semibold mb-6">Add Order</h2>

                    <div className="mb-4">
                        <label htmlFor="productName" className="text-gray-600 tracking-wider font-bold"
                        >Find Product</label>
                        <div className="relative flex flex-nowrap w-full rounded-lg bg-gray-300 dark:bg-stone-500">
                            <Input
                            placeholder="Search product name..."
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="shadow-md bg-cream-lighter rounded-r-none"            />
                            <Button type="button" onClick={handleSearch} className="rounded-l-none">Search</Button>
                        </div>
                    </div>

                    <ul className={`${showSearchResult && productName ? "h-fit py-2" : "h-0"} rounded-t-none rounded-lg overflow-auto bg-cream-lighter w-full z-10`}>
                        {
                            searchResult ? searchResult.map(product => (
                            <li
                                key={product._id}
                                onClick={() => {
                                setProductName("");
                                setShowSearchResult(false);
                                setSearchedProduct(product)
                                }}
                                className="mt-3 mx-4 font-semibold tracking-wider">{product.name}</li>
                            ))
                            : <li className="mx-auto">No Product Found</li>
                        }
                    </ul>


                    { searchedProduct && 
                        <>
                        <div className="mb-4">
                        <label htmlFor="ProductName" className="text-gray-600 tracking-wider font-bold"
                        >Product Name:</label>
                        <Input value={searchedProduct.name} type="text" name="productName" id="productName" className="shadow-md bg-cream-lighter"/>
                    </div>

                        <div className="mb-4">
                        <label htmlFor="brandName" className="text-gray-600 tracking-wider font-bold"
                        >Brand Name:</label>
                        <Input value={searchedProduct.brandName} type="text" name="brandName" id="brandName" className="shadow-md bg-cream-lighter"/>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-4 justify-between items-end-safe">
                        <div className="flex flex-wrap gap-x-4">
                            <div>
                                <label htmlFor="price"
                                    className="text-gray-600 tracking-wider font-bold"
                                >Price(₦):</label>
                                <Input value={searchedProduct.price} id="price" name="price" type="number" className="shadow-md w-[130px] max-w-fit bg-cream-lighter"/>
                            </div>
                            <div>
                                <label htmlFor="units"
                                    className="text-gray-600 tracking-wider font-bold"
                                >Units:</label>
                                <Input value={units} id="units" name="units" type="number" onChange={(e) => setUnits(parseInt(e.target.value))} className="shadow-md w-[60px] max-w-fit bg-cream-lighter"/>
                            </div>
                        </div>
                        <Button className="bg-amber-600/95 text-white"
                        onClick={() => {
                            if (!units) return toast.error("Enter a valid number of units")
                            setOrderCartData(currValue => ([...currValue, {
                                productId: searchedProduct._id,
                                productName: searchedProduct.name,
                                productBrandName: searchedProduct.brandName,
                                price: searchedProduct.price,
                                units,
                            }]))
                            setSearchedProduct(undefined)
                            setUnits(0)
                        }}>Add To Cart </Button>
                    </div>
                    </>
                    }

                    <div className="mb-6">
                        <h3 className="text-lg font-bold">Cart Items ({orderCartData.length})</h3>
                        <ul className="ml-4">
                            {
                                orderCartData.map(item => (
                                    <li key={item.productId}>-- {item.productName} ({item.units})</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="flex flex-wrap gap-x-3 md:gap-10">
                    <div className="mb-4">
                        <label htmlFor="orderStatus" className="text-gray-600 tracking-wider font-bold"
                        >Order Status:</label>
                        <Select name="status" value={orderFormData.status} onValueChange={(value) => setOrderFormData({...orderFormData, status: value})}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Product Category</SelectLabel>
                                {orderStatus.map((status) => (
                                    <SelectItem key={status} value={status.toLowerCase()}>{status}</SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {/* {errors.title && <span style={errorStyle}>{validateForm.title.required}</span>} */}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="paymentOption"
                            className="text-gray-600 tracking-wider font-bold"
                        >Payment Option:</label>
                        <Select name="paymentOption" value={orderFormData.paymentOption} onValueChange={(value) => setOrderFormData({...orderFormData, paymentOption: value})}>
                            <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Select a payment option" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Payment Options</SelectLabel>
                                {paymentOptions.map((paymentOption) => (
                                    <SelectItem key={paymentOption} value={paymentOption.toLowerCase()}>{paymentOption}</SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    </div>

                    <Button
                        className="text-white font-bold py-2 tracking-wider h-fit px-4 rounded-full w-full focus:outline-none focus:shadow-outline duration-200"
                        type="submit"
                    >
                        Add New Order
                    </Button>
                </form>
                    <Button
                        type="button"
                        onClick={() => navigate(`/admin/orders`)}
                        className="bg-blue-700 dark:bg-blue-700/80 h-fit dark:hover:bg-blue-700/90 hover:bg-blue-700/80 text-white text-center block font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-3 duration-200"
                    >
                        Back to Orders
                    </Button>
                </div>
            </div>
            </section>
        </>
    )
}

export default AdminAddOrderPage;