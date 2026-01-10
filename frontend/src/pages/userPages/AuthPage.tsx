import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { logInWithEmailAndPassword, signUpWithEmailAndPassword } from "@/controller/auth";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router";
import { useCart } from "@/context/CartContext";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", firstName: "", lastName: "", guestId: localStorage.getItem("guestId") });
  const [error, setError] = useState("");
  const {handleLogInState, userLoggedIn} = useAuth();
  const {updateLocalStore} = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if(userLoggedIn) navigate("/products")
  }, [userLoggedIn])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const data = await logInWithEmailAndPassword(formData);
        if(data.cart) updateLocalStore(data.cart)
        data.userDetail.token && handleLogInState(true);
      } else {
        const data = await signUpWithEmailAndPassword(formData);
        if(data.cart) updateLocalStore(data.cart)
        data.userDetail.token && handleLogInState(true);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <div className="min-h-[90dvh] flex items-center justify-center bg-cream-lighter dark:bg-stone-600 p-6">
      <div className="bg-cream-light dark:bg-stone-600 form_container shadow-lg rounded-xl px-8 md:px-12 py-8 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
            <label htmlFor="firstName">First Name:</label>
            <Input
              className="input p-6"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            
            <label htmlFor="lastName">Last Name:</label>
            <Input
              className="input p-6"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            </>
          )}

          <label htmlFor="email">Email:</label>
          <Input
            className="input p-6"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <Input
            className="input p-6"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="btn p-6 mt-3 md:mt-6 w-full bg-black hover:bg-neutral-800">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-amber-600 hover:underline font-semibold"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
