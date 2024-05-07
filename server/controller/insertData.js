const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const data = require("../../data/data2.json");
const slugify = require("slugify");
const CategoryData = require("../../data/cate_brand");
const productCategory = require("../models/productCategory");

const fn = async (product) => {
  let slug = slugify(product?.name);
  let count = 0;
  let newSlug = slug;

  // Kiểm tra xem có sản phẩm nào có cùng slug không
  while (await Product.findOne({ slug: newSlug })) {
    count++;
    newSlug = `${slug}-${count}`;
  }
  await Product.create({
    title: product?.name,
    slug: slugify(product?.name) + Math.round(Math.random() * 100) + "",
    description: product?.description,
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
    category: product?.category[1],
    quantity: Math.round(Math.random() * 1000),
    slod: Math.round(Math.random() * 100),
    images: product?.images,
    color: product?.variants?.find((el) => el.label === "Color")?.variants[0],
    thumb: product?.thumb,
    totalRatings: Math.round(Math.random() * 5),
  });
};

const insertProduct = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of data) promises.push(fn(product));
  await Promise.all(promises);
  return res.json("Done");
});

const fn2 = async (cate) => {
  await productCategory.create({
    title: cate?.cate,
    brand: cate?.brand,
    image: cate?.image,
  });
};
const insertCategory = asyncHandler(async (req, res) => {
  const promises = [];
  console.log(CategoryData);
  for (let cate of CategoryData) promises.push(fn2(cate));
  await Promise.all(promises);
  return res.json("Done");
});

module.exports = {
  insertProduct,
  insertCategory,
};
