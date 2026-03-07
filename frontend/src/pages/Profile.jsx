import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <Card
      className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}
    >
      {/* header */}
      <Avatar>
        <AvatarImage src={user?.user?.avata || "/src/assets/profile.png"} />
      </Avatar>
      <CardHeader></CardHeader>
      {/* content */}
      <CardContent></CardContent>
      {/* footer */}
      <CardFooter></CardFooter>
    </Card>
  );
}

export default Profile;
