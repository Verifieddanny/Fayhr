import type { Metadata } from "next";

// import ThirdwebWallet from "./ThirdwebWallet"


export const metadata: Metadata = {
  title: "Fayhr",
  description: "Generated by fayhr team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full h-full">

        {/* <ThirdwebWallet /> */}
        {children}
    
    </main>
  );
}
