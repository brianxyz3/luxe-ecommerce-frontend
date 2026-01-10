import ProductsSlider from "@/components/ProductsSlider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/authContext";
import { useCart } from "@/context/CartContext";
import useProductFetch from "@/controller/useProductFetch";
import axios from "axios";
import { Heart, Trash2 } from "lucide-react";
import React, { useState } from "react"
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";


const ShoppingCartPage = () => {
  const {cart, isEmpty, removeFromCart, updateLocalStore} = useCart();
  const navigate = useNavigate();
  const [showOrderOptions, setShowOrderOptions] = useState(false);
  const [formData, setFormData] = useState({paymentOption: "", deliveryAddress: ""})
  const {productList} = useProductFetch(6)
  const {currentUser, userLoggedIn} = useAuth();

  const cartLength = cart.length;
  const deliveryFee = 150;
  const totalPrice = cart.reduce((total, curr) => (
    total + (curr.price * curr.units)
  ), 0);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    axios({
      method: "POST",
      url: `/api/orders/${currentUser?.id}`,
      data: formData,
    }).then(({status}) => {
      if (status === 201) {
        updateLocalStore([]);
        setShowOrderOptions(false)
        toast.success("Order Confirmed, Thanks For Shopping Luxe.")
      }
    })
  }

  const handleFormInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    setFormData((currState) => (
      {...currState, [name]: evt.target.value}
    ))
  }

  return (
    <div className="relative py-6 bg-cream-lighter dark:bg-stone-700">
      <section className="flex flex-wrap-reverse md:flex-nowrap">
        <main className="w-full md:w-3/5 lg:w-2/3 px-3 lg:px-6">
          <div className="bg-cream-light dark:bg-black p-4">
            <h3 className="font-bold text-2xl">Shopping Cart({cartLength})</h3>
          </div>

          {/* Cart Products */}
          <div className="">
            <div className="lg:flex py-4 text-xl font-semibold hidden">
              <h5 className="w-3/5 ps-4">Product Details</h5>
              <h5 className="w-1/5">Quantity</h5>
              <h5 className="w-1/5">Item Price</h5>
            </div>
            <div className={`${!isEmpty && "min-h-[50dvh]"} flex flex-col gap-y-3 mt-8 lg:mt-0`}>
              { cart.length > 0 ?
                cart.map((product, idx) => (
                  <Card key={idx} className="rounded-none overflow-hidden shadow bg-cream-light dark:bg-black py-3">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4 px-3 lg:pe-0">
                        {/* <div className="w-14">
                          <Circle className="stroke-red-700 mx-auto"/>
                        </div> */}
                        <div className="w-full flex items-center justify-between flex-wrap lg:flex-nowrap">
                          <Link to={`/products/${product.productId}`} className="flex items-center gap-5 lg:gap-10 lg:w-3/5">
                            <img src="/" className="size-28 aspect-square mb-5 lg:mb-0 bg-black" alt="" />
                            <div className="">
                              <h6 className="text-lg truncate font-semibold mb-1">{product.productName}</h6>
                              <p className="mb-1">Brand: {product.productBrandName}</p>
                              <div className="flex truncate gap-2 sm:gap-4">
                                <p>Color: Blue</p>
                                <p>Weight: 10kg</p>
                              </div>
                            </div>
                          </Link>
                          <div className="w-56 lg:w-1/5">
                            <div className="flex items-center gap-3">
                              <p className="flex sm:hidden">Quantity :</p>
                              <Input 
                                value={product.units} 
                                type="number"
                                readOnly
                                name={product.productId} 
                                className="size-10 border-black p-0 text-center font-bold" 
                                />
                            </div>
                          </div>
                          <h5 className="lg:w-1/5 text-2xl font-semibold">
                            $ {product.units * Math.floor(product.price)}
                          </h5>
                        </div>
                      </div>
                      <div className="ms-3 flex gap-4 w-1/3 max-w-44 justify-between">
                        <button
                          type="button" 
                          title="remove item" 
                          className="flex items-center gap-2"
                          onClick={async () => {
                            const guestId = localStorage.getItem("guestId") || "null";
                            const {status, message} = await removeFromCart(currentUser?.id || guestId, product.productId)
                            if(status === 200) return toast.success(message);
                            return toast.error(message);
                          }}
                          >
                          <Trash2 className="stroke-red-600"/>
                          <p className="text-xs">Remove</p>
                        </button>
                        <div className="flex items-center gap-2">
                          <Heart className="stroke-red-300"/>
                          <p className="text-xs">Like</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
                : <h3 className="text-center text-3xl font-semibold mt-20">
                    Shopping Cart Is Empty
                </h3>
              }
            </div>
          </div>
        </main>

        {/* Shopping Cart Summary */}
        <aside className="w-1/2 min-w-80 lg:min-w-72 mx-auto md:sticky top-0 md:h-fit lg:w-1/4 mb-10 sm:mb-6 md:mb-0 md:mr-6">
          <div className=" flex flex-col gap-1 mb-1">
            <h2 className="text-xl font-semibold bg-cream-light dark:bg-black p-4">CART SUMMARY <span className="inline-block ml-2">({cartLength}) items</span></h2>
            <div className="bg-cream-light dark:bg-black text-gray-800 p-4 dark:text-gray-300">
              <div className="flex justify-between items-center w-11/12 mb-8">
                <h6 className="text-lg">Order Charges</h6>
                <p>$ {deliveryFee}</p>
              </div>

              <div className="flex justify-between items-center w-11/12">
                <h6 className="text-lg">Subtotal</h6>
                <p>$ {Math.floor(totalPrice)}</p>
              </div>
            </div>
            <div className="bg-cream-light dark:bg-black p-4">
              <div className="w-11/12 text-lg font-semibold flex justify-between items-baseline">
                <h5 className="tracking-wider">
                  TOTAL
                </h5>
                <h5 className="text-xl scale-110">$ {deliveryFee + Math.floor(totalPrice)}</h5>
              </div>
            </div>
          </div>

          {/* Order Options */}
          <div className="order_options_container">
            <form onSubmit={handleSubmit} className={`${showOrderOptions && "open"} bg-cream-light dark:bg-black mt-6 overflow-hidden`}>
              <fieldset className="px-4 my-4">
                <div className="flex justify-between">
                  <legend className="text-2xl font-bold">Order Confirmation</legend>
                  <button type="button" className="font-black text-lg cursor-pointer" onClick={() => setShowOrderOptions(prevValue => !prevValue)}>X</button>
                </div>
                <div className="flex flex-col gap-2.5">
                  <p className="text-lg font-semibold">Payment Options:</p>
                  <label htmlFor="payOnDelivery">
                    <input
                      required 
                      className="mr-2" 
                      value="payment on delivery" 
                      title="payment on delivery" 
                      type="radio" 
                      name="paymentOption" 
                      id="payOnDelivery"
                      onChange={handleFormInput} 
                      />
                      Payment On Delivery
                  </label>

                  <p className="text-lg font-semibold">Delivery Address:</p>
                  <Input 
                    required
                    name="deliveryAddress" 
                    value={formData.deliveryAddress} 
                    className="border-black dark:border-white" 
                    title="Address" 
                    type="text" 
                    placeholder="Delivery Address" 
                    onChange={handleFormInput}
                  />
                  <div className="mt-4">
                    <Button type="submit"
                      className="w-full rounded-sm text-lg  dark:border-white h-12 dark:bg-black dark:text-white"
                      >Confirm Order</Button>  
                  </div>
                </div>
              </fieldset>
            </form>
          </div>

          <div className="flex flex-col gap-y-4 mt-2">
            <Button
            disabled={showOrderOptions || !cart.length} 
            className={`${showOrderOptions && "hidden"} rounded-sm text-lg h-12 dark:bg-black dark:text-white`}
            onClick={() => {
                if(userLoggedIn) {
                  setShowOrderOptions(prevValue => !prevValue)
                } else {
                  navigate("/auth")
                }
              } 
            }
            >Proceed to Pay</Button>
            <Link to="/products" className="rounded-sm font-semibold flex justify-center items-center text-lg border-2 border-black h-12 bg-white dark:bg-stone-700 dark:text-white dark:border-white text-black hover:text-white">Continue Shopping</Link>
          </div>
        </aside>
      </section>

      {/* Suggested Products */}
      { productList?
        <section className="py-4 px-4 mt-8 bg-white dark:bg-stone-700 w-full">
          <ProductsSlider heading="Suggested Products" productsArr={productList} />
        </section>
      : <div className="text-3xl pt-12 text-gray-300 font-bold text-center tracking-wider">No Product Found</div>  
      }
    </div>
  )
}

export default ShoppingCartPage