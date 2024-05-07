import React from "react";
import { renderStarFromNumber, formatMoney } from "../untils/helper";
const ProductCard = ({ price, totalRatings, title, image }) => {
  return (
    <div className="w-1/3 flex-auto  flex px-[10px] mb-[20px]">
      <div className="flex w-full border">
        {" "}
        <img
          src={image}
          alt="products"
          className="w-[90px] object-contain p-4"
        />
        <div className="flex flex-col  mt-[15px] gap-1 items-start w-full text-xs">
          <span className="line-clamp-1 capitalize text-sm">
            {" "}
            {title?.toLowerCase()}
          </span>
          <span className="flex h-4">
            {renderStarFromNumber(totalRatings, 14)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span> {`${formatMoney(price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
