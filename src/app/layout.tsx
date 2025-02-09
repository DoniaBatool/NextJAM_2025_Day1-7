import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";
import Mybot from "./components/chatbot";
import { CartProvider } from "@/context/CartContext";







export const metadata: Metadata = {
  title: "Avion Private Limited",
  description: "Generated by Donia Batool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      
        
        <CartProvider>
        {children}
        </CartProvider>
          
      
           <Mybot/>
          <Footer />
        
      </body>
    </html>
  );
}
