import React from "react";
import blogIcon from "@/assets/blogIcon.png";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { LogIn } from "lucide-react";
import SearchBox from "./SearchBox";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center px-10 w-full fixed py-3 z-40 shadow-sm border-b bg-white/50 backdrop-blur-sm ">
      <div>
        <img src={blogIcon} alt="" />
      </div>
      <div className="w-md">
        <SearchBox />
      </div>
      <div>
        <Button asChild>
          <Link className="hover:rounded-full duration-100 transition-all">
            <LogIn />
            Sign in
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
