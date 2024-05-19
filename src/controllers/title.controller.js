const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { titleService } = require('../services');

const createTitle = catchAsync(async (req, res) => {
  const createPack = await titleService.createTitle(req.body);
  res.status(httpStatus.CREATED).send(createPack);
});

const getTitles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await titleService.queryTitles(filter, options);
  res.set("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(result);
});

const getTitle = catchAsync(async (req, res) => {
  const getPack = await titleService.getTitleById(req.params.titleId);
  if (!getPack) {
    throw new ApiError(httpStatus.NOT_FOUND, "Title not found");
  }
  res.send(getPack);
});

const updateTitle = catchAsync(async (req, res) => {
  const updatePack = await titleService.updateTitleById(req.params.titleId, req.body);
  res.send(updatePack);
});

const deleteTitle = catchAsync(async (req, res) => {
  const delPack = await titleService.deleteTitleById(req.params.titleId);
  if (!delPack) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Title not found');
  }
  res.send(delPack);
});

module.exports = {
  createTitle,
  getTitles,
  getTitle,
  updateTitle,
  deleteTitle,
};
