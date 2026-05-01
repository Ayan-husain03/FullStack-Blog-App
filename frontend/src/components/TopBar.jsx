import React from "react";
import blogIcon from "@/assets/blogIcon.png";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { Link } from "react-router";
import { LogIn, LogOut, Plus, User } from "lucide-react";
import SearchBox from "./SearchBox";
import { profile, RouteIndex, signIn } from "@/helper/routesNames";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "@/helper/api/api";
import { removeUser } from "@/store/auth/authSlice";

const TopBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(user);
  // console.log(user?.user?.avatar);
  // function capitalize(word) {
  //   return word.charAt(0).toUpperCase() + word.slice(1) || "";
  // }
  const handleLogout = async () => {
    try {
      const res = await api.get("/user/logout");
      dispatch(removeUser());
      toast.success("Logout", {
        description: res.data?.message || "user logout",
        duration: 2000,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        description: error.response?.data?.message || error.message,
        duration: 2000,
      });
    }
  };
  return (
    <div className="flex justify-between items-center md:px-12 px-3 w-full fixed top-0 py-3 z-40 shadow-sm border-b bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
        <Link to={RouteIndex} className="flex items-center">
          <img src={blogIcon} alt="" className="h-8 w-8" />
          <span className="ml-2 text-lg font-bold hidden sm:inline">Blog</span>
        </Link>
      </div>
      <div className="hidden sm:flex grow justify-center max-w-md">
        <SearchBox />
      </div>
      <div className="flex items-center gap-2">
        {" "}
        {!user.isLoggedIn ? (
          <Button asChild>
            <Link
              to={signIn}
              className="hover:rounded-full hover:scale-95 duration-100 transition-all"
            >
              <LogIn />
              Sign in
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  src={user?.user?.avatar || "https://placehold.net/avatar.png"}
                />
                <AvatarFallback>
                  <img src="src/assets/profile.png" alt="" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <p>{user?.user?.name}</p>
                  <p className="text-xs text-gray-500">
                    {user?.user?.email || ""}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={profile}>
                    <User />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link>
                    <Plus />
                    create blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className={"text-red-500 font-semibold"}
                  onClick={handleLogout}
                >
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default TopBar;
