const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { menubarService } = require('../services');

const createMenubar = catchAsync(async (req, res) => {
  const createMenu = await menubarService.createMenubar(req.body);
  res.status(httpStatus.CREATED).send(createMenu);
});

const getMenubars = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await menubarService.queryMenubars(filter, options);
  res.set('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(result);
});

const getMenubar = catchAsync(async (req, res) => {
  const getMenu = await menubarService.getMenubarById(req.params.menubarId);
  if (!getMenu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menubar not found');
  }
  res.send(getMenu);
});

const updateMenubar = catchAsync(async (req, res) => {
  const updateMenu = await menubarService.updateMenubarById(req.params.menubarId, req.body);
  res.send(updateMenu);
});

const deleteMenubar = catchAsync(async (req, res) => {
  const delMenu = await menubarService.deleteMenubarById(req.params.menubarId);
  if (!delMenu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menubar not found');
  }
  res.send(delMenu);
});

module.exports = {
  createMenubar,
  getMenubars,
  getMenubar,
  updateMenubar,
  deleteMenubar,
};
