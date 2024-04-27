const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const sendMail = require("../untils/sendmail");
const crypto = require("crypto");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  // check để đỡ chậm cho db
  if (!email || !password || !lastname || !firstname)
    return res.status(400).json({
      success: false,
      mes: "Missing Inputs",
    });

  const user = await User.findOne({ email });
  // chu dong bat loi
  if (user) throw new Error("User has existed!");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser
        ? "Resgister is successfully. Please go login~"
        : "Something went wrong",
    });
  }
});
// Refresh token => cấp mới token
// Access token => Xác thực người dùng, phần quyền người dùng
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check để đỡ chậm cho db
  if (!email || !password)
    return res.status(400).json({
      success: false,
      mes: "Missing Inputs",
    });
  const response = await User.findOne({ email });
  // console.log(response.isCorrectPassword(password));
  if (response && (await response.isCorrectPassword(password))) {
    // tách pw và role ra khỏi reponse
    const { password, role, refreshToken, ...userData } = response.toObject();
    // tạo accessToken
    const accessToken = generateAccessToken(response._id, role);
    // tạo refreshToken
    const newRefreshToken = generateRefreshToken(response._id);
    // Lưu refresh Token vào database
    await User.findOneAndUpdate(
      response._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );
    // lưu refresh vào cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      accessToken,
      // refreshToken,
      userData,
    });
  } else {
    throw new Error("Invalid credentials");
  }
});
const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id).select("-refreshToken -password -role");
  return res.status(200).json({
    success: user ? true : false,
    rs: user ? user : "User not found",
  });
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  //  Lấy token từ cookies
  const cookie = req.cookies;
  //  check xem có token hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  //  check xem token có hợp lệ hay không
  // const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  // return res.json(response);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : " Refresh token not matched",
  });
});
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // xoá refresh token ở db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  ); // xoá refesh token ở cookie trình duyệt
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout is done",
  });
});

// client gửi tới email
// server check email có hợp lệ hay không => gửi mail + kèm theo link (password changg token)
// client check mail => click link
// client gửi api kèm token
// check xem token có giống token mmaf server gửi mail hay không
// change password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangedToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút. <a 
  href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`;

  const data = {
    email,
    html,
  };
  const rs = await sendMail(data);
  return res.status(200).json({
    success: true,
    rs,
  });
});
const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select("-refreshToken -password -role");
  return res.status(200).json({
    success: response ? true : false,
    users: response,
  });
});
const deleteUsers = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  if (!_id) throw new Error("Missing input");

  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deleteUser: response
      ? `User with emai  ${response.email} deleted `
      : `No User deleted`,
  });
});
const updateUsers = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing input");

  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ? response : "Something went wrong",
  });
});
const updateUsersByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;

  if (Object.keys(req.body).length === 0) throw new Error("Missing input");

  const response = await User.findByIdAndUpdate(uid, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updateUser: response ? response : "Something went wrong",
  });
});
module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  getUsers,
  deleteUsers,
  updateUsers,
  updateUsersByAdmin,
};
