import React, { useEffect, useState, Fragment } from "react";
// import icons from "../untils/icons"; // Make sure the path is correct
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import path from "../untils/path"; // Make sure to import path correctly
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faShoppingBag,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { showCart } from "../store/app/appSlice";
// import withBaseComponent from "hocs/withBaseComponent";
import { logout } from "../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  // const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  useEffect(() => {
    const handleClickoutOptions = (e) => {
      const profile = document.getElementById("profile");
      if (!profile?.contains(e.target)) setIsShowOption(false);
    };

    document.addEventListener("click", handleClickoutOptions);

    return () => {
      document.removeEventListener("click", handleClickoutOptions);
    };
  }, []);
  return (
    <div className=" w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img
          src={logo}
          alt="logo"
          className="  w-[140px] pd-30 object-contain"
        />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col px-4 border-r items-center boder-right">
          <span className="flex gap-4 items-center">
            <FontAwesomeIcon icon={faPhone} color="red" />

            <span className="font-semibold">(+1800) 000 888</span>
          </span>
          <span> Mon-Sat 9:00AM-8:00PM</span>
        </div>

        <div className="flex flex-col items-center px-4 border-left">
          <span className="flex gap-4 items-center">
            {/* <MdEmail color="red" /> */}
            <FontAwesomeIcon icon={faEnvelope} color="red" />

            <span className="font-semibold">SUPPORT@DATATHMESE.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>

        <div className="flex items-center justify-center gap-2 px-4 border-left ">
          {/* <BSHandbagFill color="red" /> */}
          <FontAwesomeIcon icon={faShoppingBag} color="red" />
          <span>0 item(s)</span>
        </div>
        <div className="flex  items-center justify-center px-4 border">
          {/* <FaUserCircle size={24} /> */}
          <FontAwesomeIcon icon={faUserCircle} size="2x" />
        </div>
        {/* {current && (
          <Fragment>
            <div
              onClick={() => dispatch(showCart())}
              className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r"
            >
              <span className="relative md:hidden inline-block">
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 flex items-center justify-center text-[10px] text-white rounded-full">
                  {current?.cart?.length || 0}
                </span>
                {/* <BsHandbagFill size={20} color="red" /> 
              </span>
              <span className="hidden md:inline-block">{`${
                current?.cart?.length || 0
              } item(s)`}</span>
            </div>
            <div
              className="flex cursor-pointer items-center justify-center px-6 gap-2 relative"
              onClick={() => setIsShowOption((prev) => !prev)}
              id="profile"
            >
              {/* <FaUserCircle size={20} color="red" /> 
              <span className="hidden md:inline-block">Profile</span>
              {isShowOption && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full flex-col flex right-4 md:left-[16px] bg-gray-100 border md:min-w-[150px] py-2"
                >
                  <Link
                    className="p-2 w-full hover:bg-sky-100"
                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                  >
                    Personal
                  </Link>
                  {+current.role === 1945 && (
                    <Link
                      className="p-2 w-full hover:bg-sky-100"
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      Admin workspace
                    </Link>
                  )}
                  <span
                    onClick={() => dispatch(logout())}
                    className="p-2 w-full hover:bg-sky-100"
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          </Fragment>
        )} */}
      </div>
    </div>
  );
};

export default Header;
