import React, { useEffect, useState } from "react";
import { apiGetproducts } from "../apis/product";
import { apiGetCategories } from "../apis";
import { Product, CustomSlider } from "/";
import { getNewProducts } from "../store/product/asynsAction";
import { useDispatch, useSelector } from "react-redux";
const tabs = [
  { id: 1, name: "best seller" },
  { id: 2, name: "new arrivals" },
  // { id: 3, name: "tablet" },
];

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);

  const fetchProducts = async () => {
    const response = await apiGetproducts({ sort: "-sold" });

    if (response.success) {
      setBestSellers(response.products);
      setProducts(response.products);
    }
  };
  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
  }, [dispatch]);
  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers);
    if (activedTab === 2) setProducts(newProducts);
  }, [activedTab]);
  return (
    <div>
      <div className="flex text-[20px] pb-4 ml-[32px]">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold uppercase pr-8 border-r cursor-pointer ${
              activedTab === el.id
                ? "text-gray-900 pl-[30px]"
                : "text-gray-400 pl-[30px]"
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px] border-t-2 border-main pt-4">
        {" "}
        <CustomSlider products={products} activedTab={activedTab} />
      </div>
      <div className="w-full flex gap-4 mt-4">
        <img
          src="https://img.websosanh.vn/v10/users/review/images/f5hn6wdmwh2o8/1439264742-168199676155c96fe66d121.jpg?compress=85"
          alt="banner"
          className="flex-1 object-contain w-[200px]"
        />
        <img
          src="https://images.foody.vn/res/g90/892190/prof/s640x400/foody-upload-api-foody-mobile-a-200108172452.jpg"
          alt="banner"
          className="flex-1 object-contain w-[200px]"
        />
      </div>
    </div>
  );
};

export default BestSeller;
