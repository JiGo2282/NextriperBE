const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { entertainmentService } = require('../services');

const createEntertainment = catchAsync(async (req, res) => {
  req.body.packLongDescription = req.body.packLongDescription.replaceAll('&lt;', '<');
  const createPack = await entertainmentService.createEntertainment(req.body);
  res.status(httpStatus.CREATED).send(createPack);
});

const getEntertainments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await entertainmentService.queryEntertainments(filter, options);
  res.set("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(result);
});

const getEntertainmentSample = catchAsync(async (req, res) => {
  const result = {
    Hello: 'World',
  };
  res.set('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(result);
});

const getEntertainment = catchAsync(async (req, res) => {
  const getPack = await entertainmentService.getEntertainmentById(req.params.entertainmentId);
  if (!getPack) {
    throw new ApiError(httpStatus.NOT_FOUND, "Entertainment not found");
  }
  res.send(getPack);
});

const updateEntertainment = catchAsync(async (req, res) => {
  const updatePack = await entertainmentService.updateEntertainmentById(req.params.entertainmentId, req.body);
  res.send(updatePack);
});

const deleteEntertainment = catchAsync(async (req, res) => {
  const delPack = await entertainmentService.deleteEntertainmentById(req.params.entertainmentId);
  if (!delPack) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Entertainment not found');
  }
  res.send(delPack);
});

module.exports = {
  createEntertainment,
  getEntertainments,
  getEntertainment,
  updateEntertainment,
  deleteEntertainment,
  getEntertainmentSample,
};
