import React from "react";
import blogIcon from "@/assets/blogIcon.png";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { LogIn } from "lucide-react";
import SearchBox from "./SearchBox";
import { signIn } from "@/helper/routesNames";
import { toast } from "sonner";

const TopBar = () => {
  // const handleClick = () => {
  //   const promise = new Promise((res, rej) => {
  //     setTimeout(() => {
  //       res("hey");
  //     }, 2000);
  //   });
  //   console.log("clicked");
  //   // toast.error("Login successfull", {
  //   //   description: "Welcome back Ayan",
  //   //   duration: 3000,
  //   // });
  //   toast.promise(promise, {
  //     loading: "Logging in....",
  //     success: {
  //       message: "login in ",
  //       description: "you are logged in",
  //     },
  //     error: "something went wrong",
  //   });
  // };
  return (
    <div className="flex justify-between items-center md:px-10 px-2  w-full fixed py-3 z-40 shadow-sm border-b bg-white/50 backdrop-blur-sm ">
      <div>
        <img src={blogIcon} alt="" />
      </div>
      <div className="w-md">
        <SearchBox />
      </div>
      <div>
        <Button asChild>
          <Link
            to={signIn}
            className="hover:rounded-full hover:scale-95 duration-100 transition-all"
          >
            <LogIn />
            Sign in
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
