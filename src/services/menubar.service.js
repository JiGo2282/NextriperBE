const httpStatus = require('http-status');
const { Menubar } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a menubar
 * @param {Object} menubarBody
 * @returns {Promise<Menubar>}
 */
const createMenubar = async (menubarBody) => {
  return Menubar.create(menubarBody);
};

/**
 * Query for menubars
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMenubars = async (filter, options) => {
  const menubars = await Menubar.paginate(filter, options);
  return menubars;
};

/**
 * Get menubar by id
 * @param {ObjectId} id
 * @returns {Promise<Menubar>}
 */
const getMenubarById = async (id) => {
  return Menubar.findById(id);
};

/**
 * Update menubar by id
 * @param {ObjectId} menubarId
 * @param updateBody
 * @returns {Promise<Menubar>}
 */
const updateMenubarById = async (menubarId, updateBody) => {
  const updateMenubar = await getMenubarById(menubarId);
  if (!updateMenubar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menubar not found');
  }
  Object.assign(updateMenubar, updateBody);
  await updateMenubar.save();
  return updateMenubar;
};

/**
 * Delete menubar by id
 * @param {ObjectId} menubarId
 * @returns {Promise<Menubar>}
 */
const deleteMenubarById = async (menubarId) => {
  const delMenubar = await getMenubarById(menubarId);
  if (!delMenubar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menubar not found');
  }
  await delMenubar.remove();
  return delMenubar;
};

module.exports = {
  createMenubar,
  queryMenubars,
  getMenubarById,
  updateMenubarById,
  deleteMenubarById,
};
