import type { loginDataObj, RegisterDataObj, UserObj } from "@/types";
import axios from "axios";



function setCookie(name: string , value: string, days: number) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 100).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; Secure; SameSite=Lax;`
  }

const initializeUser = (user: UserObj) => {
    Object.entries(user).forEach(([Key, value]) => {
        setCookie(Key, value, 7)
    })
    localStorage.setItem("guestId", "null");
}

const signUpWithEmailAndPassword = async (formData: RegisterDataObj) => {
    const { data } = await axios.post("http://localhost:3000/api/users/register", formData);
    if (data.userDetail.token) {
        initializeUser(data.userDetail);
        console.log("Sign Up Authentication successful");
    }
    return data;
  };

const logInWithEmailAndPassword = async (formData: loginDataObj) => {
    const { data } = await axios.post("http://localhost:3000/api/users/login", formData);
    if (data.userDetail.token) {
        initializeUser(data.userDetail);
        console.log("Log In Authentication successful");
    }
    return data;
  };

const signOut = async () => {
    const { status, data } = await axios.get("/api/users/signOut");
    if (status) {
        localStorage.setItem("cart", JSON.stringify([]));
        const splitCookie = document.cookie.split(";");
        splitCookie.forEach((cookie) => {
            const [name] = cookie.trim().split("=");
            setCookie(name, "", -100);
        });
    }
    
    return {message: data.message, status};
  };



  export {
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword,
    signOut,
  }