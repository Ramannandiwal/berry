import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../../context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Berry - React Material  Add",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       
     
      </head>
      <body className={inter.className}>
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
