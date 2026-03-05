import React from "react";
import blogIcon from "@/assets/blogIcon.png";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { LogIn, LogOut, Plus, User } from "lucide-react";
import SearchBox from "./SearchBox";
import { signIn } from "@/helper/routesNames";
import { toast } from "sonner";
import { useSelector } from "react-redux";
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

const TopBar = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  return (
    <div className="flex justify-between items-center md:px-12 px-3  w-full fixed py-3 z-40 shadow-sm border-b bg-white/50 backdrop-blur-sm ">
      <div>
        <img src={blogIcon} alt="" />
      </div>
      <div className="w-md">
        <SearchBox />
      </div>
      <div>
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
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>
                  <p>{capitalize(user?.user?.name)}</p>
                  <p className="text-xs text-gray-500">
                    {user?.user?.email || ""}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link>
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
                <DropdownMenuItem asChild>
                  <Link className="font-semibold">
                    <LogOut />
                    Logout
                  </Link>
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
