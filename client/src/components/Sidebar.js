import React from "react";
// import { apiGetCategories } from "../apis/app";
import { NavLink } from "react-router-dom";
import { createSlug } from "../untils/helper";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);
  console.log(categories);
  return (
    <div className="flex flex-col border">
      {categories?.map((el) => (
        <NavLink
          key={createSlug(el.title)}
          to={createSlug(el.title)}
          className={({ isAcive }) =>
            isAcive
              ? "bg-main text-white px-5 pt-[15px] pb-[14px] tex-sm hover:text-main "
              : "px-5 pt-[15px] pb-[14px] tex-sm hover:text-main"
          }
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
