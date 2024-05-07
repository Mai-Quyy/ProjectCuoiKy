import React, { memo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../untils/path";
// import { getCurrent } from "../store/user/asyncActions";
// import { useSelector, useDispatch } from "react-redux";
// import icons from "ultils/icons";
// import { logout, clearMessage } from "../store/user/userSlice";
// import Swal from "sweetalert2";

const TopHeaderrr = () => {
  // const { isLoggedIn, current, mes } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const setTimeoutId = setTimeout(() => {
  //     if (isLoggedIn) dispatch(getCurrent());
  //   }, 300);

  //   return () => {
  //     clearTimeout(setTimeoutId);
  //   };
  // }, [dispatch, isLoggedIn]);

  // useEffect(() => {
  //   if (mes)
  //     Swal.fire("Oops!", mes, "info").then(() => {
  //       dispatch(clearMessage());
  //       navigate(`/${path.LOGIN}`);
  //     });
  // }, [mes]);
  return (
    <div className="h-[38px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white ">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        <Link to={`${path.LOGIN}`}>Sign In Or Create</Link>
      </div>
    </div>
  );
};

export default memo(TopHeaderrr);
