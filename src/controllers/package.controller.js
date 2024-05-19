const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { packageService } = require('../services');

const createPackage = catchAsync(async (req, res) => {
  req.body.packLongDescription = req.body.packLongDescription.replaceAll('&lt;', '<');
  const createPack = await packageService.createPackage(req.body);
  res.status(httpStatus.CREATED).send(createPack);
});

const getPackages = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await packageService.queryPackages(filter, options);
  res.set("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(result);
});

const getPackageSample = catchAsync(async (req, res) => {
  const result = {
    Hello: 'World',
  };
  res.set('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(result);
});

const getPackage = catchAsync(async (req, res) => {
  const getPack = await packageService.getPackageById(req.params.packageId);
  if (!getPack) {
    throw new ApiError(httpStatus.NOT_FOUND, "Package not found");
  }
  res.send(getPack);
});

const updatePackage = catchAsync(async (req, res) => {
  req.body.packLongDescription = req.body.packLongDescription.replaceAll('&lt;', '<');
  const updatePack = await packageService.updatePackageById(req.params.packageId, req.body);
  res.send(updatePack);
});

const deletePackage = catchAsync(async (req, res) => {
  const delPack = await packageService.deletePackageById(req.params.packageId);
  if (!delPack) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Package not found');
  }
  res.send(delPack);
});

module.exports = {
  createPackage,
  getPackages,
  getPackage,
  updatePackage,
  deletePackage,
  getPackageSample,
};
