import React from "react";
import {} from "../components";
import icons from "../untils/icons";
import logo from "../assets/logo.png";
// import { Link } from "react-router-dom";
import path from "../untils/path";

const Header = () => {
  //   const { RiphoneFill } = icons;
  return (
    <div className="border w-main flex justify-between h-[100px] py-[35px] ">
      {/* <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link> */}
      <div className="flex text-[13px]">
        <div>
          <span className="flex gap-4 items-center">
            {/* <RiphoneFill color='red'/> */}
            <span className="font-semibold">(+1800) 000 888</span>
          </span>
          <span> MOn-Sate 9:00AM-8:00PM</span>
        </div>
      </div>
      <div className="flex flex-col px-6 border-r items-center">
        <span className="flex gap-4 items-center">
          {/* <MdEmaul color='red'/> */}
          <span className="font-semibold">SUUPPORT@DATATHMESE.COM</span>
        </span>
        <span>Online Support 24/7</span>
      </div>
      <div>info</div>
      <div>info</div>
      <div>info</div>
    </div>
  );
};

export default Header;
