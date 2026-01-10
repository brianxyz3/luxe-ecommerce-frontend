// import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, User } from "lucide-react";
import { heroModelImg } from "@/assets/images";
import { Link } from "react-router";
import Footer from "@/components/Footer";
import HeaderNav from "@/components/HeaderNav";
import ProductsSlider from "@/components/ProductsSlider";
import useProductFetch from "@/controller/useProductFetch";
import ProductCard from "@/components/ProductCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const HomePage = () => {  
  const {productList, isLoading, error} = useProductFetch(1); 

  return (
    <>
      {/* Header */}
      <HeaderNav isHome={true}/>

      {/* Hero Section */}
      <main className="mt-16 md:mt-0">
        <section className="hero text-black dark:text-white relative overflow-hidden w-dvw h-[60dvh] lg:h-[75dvh] ">
          <div className="relative flex bg-gradient-to-b from-cream-darker dark:from-[#231b16] to-40% to-transparent w-full h-full">
            <div className="hero_container_shadow z-10 w-2/3 h-full md:bg-cream-light md:dark:bg-black md:w-[65%]">
              <div className="flex flex-col gap-y-8 justify-center items-center h-full px-10 lg:gap-y-10">
                <div className="">
                  <h1 className="text-2xl md:text-4xl lg:text-5xl mb-6 tracking-wider font-bold lg:mb-8">Unleash Your <br/> Inner Radiance</h1>
                  <p className="leading-6 mb-6 tracking-wide text-lg lg:text-xl lg:leading-7 lg:mb-7">Look effortlessly radiant with easy-to-apply <br/> products that save time and feel like you.</p>
                  <div className="flex flex-wrap md:flex-nowrap gap-4 font-bold items-center">
                    <Button className="bg-black dark:bg-white dark:text-black text-white truncate text-base font-bold w-52 h-12"> Shop Quick Kits</Button>
                    <Button className="truncate border-2 bg-transparent  hover:text-white hover:border-white dark:border-white dark:text-white text-base font-bold border-black w-52 h-12 text-black transition-all">Consult a Cosmetician</Button>
                  </div>
                </div>
                <div className="hidden md:flex gap-6 text-sm lg:text-base">
                    <div className="flex flex-col items-center text-center gap-y-1 w-28 lg:w-32">
                      <Search/>
                      <p>Safe, Clean beauty tested by dermatologists</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-y-1 w-28 lg:w-32">
                      <ShoppingCart/>
                      <p>Fast & flawless makeup made for real mornings</p>
                    </div>
                    <div className="flex flex-col items-center text-center gap-y-1 w-28 lg:w-32">
                      <User/>
                      <p>No animal testing --ever. Certified cruelty-free.</p>
                    </div>
                </div>
              </div>
            </div>
            <div className="md:absolute top-0 right-0 md:-right-4 w-full md:w-2/5 h-full">
              <img src={heroModelImg} className="w-full h-full object-cover lg:object-fill object-top" alt="" />
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-white dark:text-white dark:bg-stone-700 px-2">
          {productList ?
            <ProductsSlider heading="Best Sellers" productsArr={productList} />
            : <div className="text-3xl pt-12 text-gray-300 font-bold text-center tracking-wider">No Product Found</div>
          }
        </section>

        {/* All Products */}
        <section className="bg-cream-lighter dark:bg-stone-700">
          <div className="flex justify-between bg-cream-light text-gray-800 dark:bg-black dark:text-white">
            <Link to="/products" className="px-3 md:px-6 py-1.5 tracking-wider font-black">All Products</Link>
          </div>
          {/* <div className="flex flex-wrap justify-evenly shrink-0 gap-6 py-6 bg-white dark:bg-stone-700"> */}
          { productList? 
            <div className="grid grid-cols-2 lg:grid-cols-3 place-items-center gap-3 sm:gap-6 py-6 px-2 md:px-6 lg:w-5/6 mx-auto">
              {productList.map((product) => (
                <ProductCard key={product._id} variant="default" product={product}/>
              ))}
            </div>
          : <div className="text-3xl pt-12 text-gray-300 font-bold text-center tracking-wider">No Product Found</div>
          }
          {isLoading && <div>Loading</div>}
          {error && <div>Error</div>}
          <div className="bg-white dark:bg-stone-700 pt-10 pb-8">
            <Link to='/products' className="block w-fit mx-auto hover:font-bold text-amber-600 dark:text-amber-300 tracking-wider transition-all">VIEW ALL PRODUCTS</Link>
          </div>
        </section>

        {/* Promotions Section */}
        <section className="py-10 px-6 text-center dark:bg-black dark:text-white">
          <h2 className="text-xl font-semibold mb-2">Buy 2 Get 1 Free</h2>
          <p className="mb-4">On selected haircare products. Limited time only.</p>
          <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full">Shop Offer</Button>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 px-6 bg-white dark:bg-stone-700 dark:text-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">Customer Love</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="p-4 rounded-2xl shadow-md">
                <p className="italic">“Absolutely obsessed with the glow this gives me!”</p>
                <p className="mt-2 font-semibold">— Jamie L.</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-white text-black dark:text-white dark:bg-black py-10 px-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Get 10% Off Your First Order</h2>
          <p className="mb-4">Sign up for our newsletter to receive exclusive offers and updates.</p>
          <div className="flex justify-center">
            <Input placeholder="Enter your email" className="max-w-md rounded-l-full dark:border-white" />
            <Button className="rounded-r-full bg-amber-500 hover:bg-amber-600 text-white">Subscribe</Button>
          </div>
        </section>
      </main>
      {/* Footer */}
      <Footer/>
      <ToastContainer />
    </>
  )
}

export default HomePage;
