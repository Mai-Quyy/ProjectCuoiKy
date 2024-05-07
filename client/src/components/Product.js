import React, { useState } from "react";
import { formatMoney } from "../untils/helper";
import label from "../assets/label.png";
import labelblue from "../assets/label-blue1.png";
import { renderStarFromNumber } from "../untils/helper";
import { SelectOption } from "./";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faBars, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import path from "../untils/path";
const Product = ({ productData, isNew }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  return (
    <div className="w-full text-base  px-[10px]">
      <Link
        className="w-full border p-[15px] flex flex-col items-center "
        to={`/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        {" "}
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animation-slide-top">
              <SelectOption icon={<FontAwesomeIcon icon={faEye} />} />
              <SelectOption icon={<FontAwesomeIcon icon={faBars} />} />
              <SelectOption icon={<FontAwesomeIcon icon={faHeart} />} />
            </div>
          )}{" "}
          <img
            src={
              productData?.thumb ||
              "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
            }
            alt=""
            className="w-[274px] h-[274px] object-cover"
          />
          <img
            src={isNew ? label : labelblue}
            alt=""
            className={`absolute w-[120px] top-[-32px] left-[-42px]  object-contain`}
          />
          <span
            className={`font-bold top-[-10px] left-[-12px] text-white absolute ${
              isNew ? "" : "text-sm"
            }`}
          >
            {isNew ? "New" : "Trending"}
          </span>
        </div>
        <div className="flex flex-col  mtq-[15px] gap-1 items-start w-full">
          <span className="flex h-4">
            {renderStarFromNumber(productData.totalRatings)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
          </span>
          <span className="line-clamp-1"> {productData?.title}</span>

          <span> {`${formatMoney(productData?.price)} VND`}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;
