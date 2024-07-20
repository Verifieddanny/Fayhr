"use client";
import { useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import { ConnectButton, useActiveAccount, lightTheme } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { client, chain } from "../utils/constant";
import { getUserEmail } from "thirdweb/wallets/in-app";
import Loader from "./Loader";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "apple"],
    },
  }),
];



function Login() {
   const [accountConnected, setAccountConnected] = useState("");
   const [email, setEmail] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
   const [isError, setIsError] = useState(false);
   const router = useRouter();
   const account: any = useActiveAccount?.();

      const logInError = () => {
        toast("Account Does not Exist, 📛Disconnect wallet and Sign Up!", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      };


   useEffect(() => {
     const signUp = async () => {
       const response = await fetch(
         `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
         {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
             Secret: process.env.NEXT_PUBLIC_SECRET!,
           },
           body: JSON.stringify({
             address: accountConnected,
           }),
         }
       );

               const data = await response.json();
                  console.log("data", data);
                  return data;
                };

                    
                      if (account?.address) {
                        signUp()
                         .then((data) => setIsSuccess(data?.success))

                         if(!isSuccess){
                           setIsError(true);
                         }
                        
                      }
        
      }, [account, accountConnected, email, isSuccess])



      useEffect(() => {
        setAccountConnected(account && account?.address);

        if (account?.address) {
          setIsLoading(true);
        }

        if (account && account.address && isSuccess) {
          console.log("Success!");

          router.push("/home-page");
        }

        if (isError) {
          setIsLoading(false);
          // logInError();
        }
      }, [account, router, isSuccess, isError]);
      
   const handleGoBack = () => {
     router.back();
   };

   if (isLoading) {
     return <Loader />;
   }

  return (
    <form className="w-full h-full  gap-y-[0.45rem] flex flex-col items-center">
      <MdArrowBackIosNew
        onClick={handleGoBack}
        className="absolute top-4  left-4 cursor-pointer"
      />

      <p className="text-[1.0625rem] font-[800] mt-6 mb-12">Log in</p>

      <ConnectButton
        client={client}
        chain={chain}
        wallets={wallets}
        theme={lightTheme({
          colors: {
            primaryButtonBg: "#01A8F6",
            primaryButtonText: "#f2f1f3",
          },
        })}
        connectButton={{
          label: "Generate Wallet",
        }}
        connectModal={{
          title: "Fahyr",
          showThirdwebBranding: false,
        }}
      />

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </form>
  );
}

export default Login;
