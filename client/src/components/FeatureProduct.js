import React, { useState, useEffect } from "react";
import { ProductCard } from "./";
import { apiGetproducts } from "../apis";

const FeatureProduct = () => {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetproducts({ limit: 9, totalRatings: 5 });
    if (response.success) setProducts(response.products);
    console.log(setProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURED PRODUCTS
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px]">
        {products?.map((el) => (
          <ProductCard
            key={el._id}
            image={el.thumb}
            title={el.title}
            totalRatings={el.totalRatings}
            price={el.price}
          />
        ))}
      </div>
      <div className="flex justify-between ">
        <img
          className="w-[49%] object-contain "
          src="https://www.dutchlady.com.vn/sites/default/files/2022-05/mb_banner_Homepage01072020%20%281%29_0.jpg"
          alt=""
        />

        <div className="flex flex-col justify-between  gap-4 w-[24%] ">
          <img
            src="https://batos.vn/images/upload/images/a84324172caa98035b6e117a55ce8a0d.jpg"
            alt=""
            className="h-[49%]"
          />
          <img
            src="https://seotrends.com.vn/wp-content/uploads/2023/06/banner-sale-3d.jpg"
            alt=""
            className="h-[49%]"
          />
        </div>
        <img
          src="https://www.vinamilk.com.vn/sua-tuoi-vinamilk/wp-content/themes/suanuoc/tpl/fm100-revamp/images/intro/bg-mo.jpg"
          alt=""
          className="w-[24%] "
        />
      </div>
    </div>
  );
};

export default FeatureProduct;
