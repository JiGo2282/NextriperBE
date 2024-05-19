const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { testimonialService } = require('../services');

const createTestimonial = catchAsync(async (req, res) => {
  const createPack = await testimonialService.createTestimonial(req.body);
  res.status(httpStatus.CREATED).send(createPack);
});

const getTestimonials = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await testimonialService.queryTestimonials(filter, options);
  res.set("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(result);
});

const getTestimonialSample = catchAsync(async (req, res) => {
  const result = {
    Hello: 'World',
  };
  res.set('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(result);
});

const getTestimonial = catchAsync(async (req, res) => {
  const getPack = await testimonialService.getTestimonialById(req.params.testimonialId);
  if (!getPack) {
    throw new ApiError(httpStatus.NOT_FOUND, "Testimonial not found");
  }
  res.send(getPack);
});

const updateTestimonial = catchAsync(async (req, res) => {
  const updatePack = await testimonialService.updateTestimonialById(req.params.testimonialId, req.body);
  res.send(updatePack);
});

const deleteTestimonial = catchAsync(async (req, res) => {
  const delPack = await testimonialService.deleteTestimonialById(req.params.testimonialId);
  if (!delPack) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Testimonial not found');
  }
  res.send(delPack);
});

module.exports = {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonialSample,
};
