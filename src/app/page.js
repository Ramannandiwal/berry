import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 // Import the specific icon you want to use

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello world </h1>
      <div className="w-20 h-20 bg-blue-400 flex items-center justify-center text-white">
     
      </div>
      
      <Link href={"/login"}>Login</Link>
      <Link href={"/register"}>Register</Link>
    </div>
  );
}
