import { Copyright } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div className="text-xs flex justify-center items-center space-x-1 bg-gray-100 py-2 mt-20 border text-gray-500">
      <Copyright size={15} />
      Copyright 2026 | Design and Develop By |{" "}
      <a className="font-bold" href="https://github.com/Ayan-husain03">
        {" "}
        __Ayan Husain
      </a>
    </div>
  );
}

export default Footer;
