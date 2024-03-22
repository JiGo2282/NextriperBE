const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { inquiryService } = require("../services");
const { any } = require("joi");

const createInquiry = catchAsync(async (req, res) => {
  const createInq = await inquiryService.createInquiry(req.body);
  res.status(httpStatus.CREATED).send(createInq);
});

const getInquiries = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  let result = any;
  // eslint-disable-next-line no-prototype-builtins
  const limit = 1000;
  const page = 100;
  const results = await inquiryService.getInquiriesByDateRange(req.query, limit);
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / limit);
  result = {
    results,
    totalResults,
    totalPages,
    limit,
    page,
  };

  res.set("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(result);
});

const getInquiry = catchAsync(async (req, res) => {
  const getInq = await inquiryService.getInquiryById(req.params.inquiryId);
  if (!getInq) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not found");
  }
  res.send(getInq);
});

const updateInquiry = catchAsync(async (req, res) => {
  const updateInq = await inquiryService.updateInquiryById(req.params.inquiryId, req.body);
  res.send(updateInq);
});

const deleteInquiry = catchAsync(async (req, res) => {
  await inquiryService.deleteInquiryById(req.params.inquiryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createInquiry,
  getInquiries,
  getInquiry,
  updateInquiry,
  deleteInquiry
};
