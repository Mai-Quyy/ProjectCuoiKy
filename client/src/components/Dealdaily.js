import React, { useEffect, useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faBars } from "@fortawesome/free-solid-svg-icons";
import { apiGetproducts } from "../apis/product";
import {
  renderStarFromNumber,
  formatMoney,
  secondsToHms,
} from "../untils/helper";
import { Countdown } from "./";
import moment from "moment";
let idInterval;
const Dealdaily = () => {
  const [dealdaily, setDealdaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setexpireTime] = useState(false);
  const fetchDealdaily = async () => {
    const response = await apiGetproducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
      totalRatings: 5,
    });
    console.log(response);
    if (response && response.success) {
      setDealdaily(response.products[0]);

      const today = `${moment().format("MM/DD/YYYY")} 00:00:00`;
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;

      const number = secondsToHms(seconds);
      setHour(number.h);
      setMinute(number.m);
      setSecond(number.s);
    } else {
      setHour(0);
      setMinute(59);
      setSecond(59);
    }
  };

  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchDealdaily();
  }, [expireTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (second > 0) setSecond((pre) => pre - 1);
      else {
        if (minute > 0) {
          setMinute((pre) => pre - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((pre) => pre - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setexpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);
  return (
    <div className="border w-full flex-auto">
      <div className="flex items-center justify-between p-4 w-full">
        <span className="flex-1 flex justify-center">
          {<FontAwesomeIcon icon={faStar} size="2x" color="#DD1111" />}
        </span>
        <span className="flex-8 font-semibold text-[20px] flex justify-center text-gray-700">
          {" "}
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center pt-8 px-4 gap-2">
        <img
          src={
            dealdaily?.thumb ||
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
          }
          alt=""
          className="w-full object-contain "
        />
        <span className="flex h-4">
          {renderStarFromNumber(dealdaily?.totalRatings, 20)?.map(
            (el, index) => (
              <span key={index}>{el}</span>
            )
          )}
        </span>
        <span className="line-clamp-1 text-center"> {dealdaily?.title}</span>

        <span className="flex h-4">
          {dealdaily?.price ? `${formatMoney(dealdaily.price)} VND` : ""}
        </span>
      </div>
      <div className="px-4 mt-8">
        <div className="flex justify-center gap-2 items-center mb-4">
          <Countdown unit={"Hours"} number={hour} />
          <Countdown unit={"Minute"} number={minute} />
          <Countdown unit={"Sencond"} number={second} />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
        >
          <FontAwesomeIcon icon={faBars} />

          <span>Options</span>
        </button>
      </div>
    </div>
  );
};

export default memo(Dealdaily);
