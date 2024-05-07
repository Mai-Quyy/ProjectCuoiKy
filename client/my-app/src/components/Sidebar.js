import React, { userState, userEffect, useState } from "react";
import { apiGetCategories } from "../apis/app";
// import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const [categories, setCategories] = useState(null);
  const fetchCategories = async () => {
    const response = await apiGetCategories();
    if (response.success) setCategories(response.prodCategories);
  };
  userEffect(() => {
    fetchCategories();
  });
  console.log(categories);
  // const
  return <div>Sidebar</div>;
};

export default Sidebar;
