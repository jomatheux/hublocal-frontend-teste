"use client";
import { toast } from "react-toastify";

const UseToast = (message: string, status: string = " ") => {
    if(!status || status === "success"){
        toast.success(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
        });
    }else if(status === "error"){
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "light",
        });        
    }
}

export default UseToast;