const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bannerService } = require('../services');

const createBanner = catchAsync(async (req, res) => {
  const createBan = await bannerService.createBanner(req.body);
  res.status(httpStatus.CREATED).send(createBan);
});

const getBanners = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await bannerService.queryBanners(filter, options);
  res.set("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(result);
});

const getBanner = catchAsync(async (req, res) => {
  const getBan = await bannerService.getBannerById(req.params.bannerId);
  if (!getBan) {
    throw new ApiError(httpStatus.NOT_FOUND, "Banner not found");
  }
  res.send(getBan);
});

const deleteBanner = catchAsync(async (req, res) => {
  const delBan = await bannerService.deleteBannerById(req.params.bannerId);
  if (!delBan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Banner not found');
  }
  res.send(delBan);
});

module.exports = {
  createBanner,
  getBanners,
  getBanner,
  deleteBanner,
};
