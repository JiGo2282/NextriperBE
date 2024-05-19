const httpStatus = require('http-status');
const { Title } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a title
 * @param {Object} titleBody
 * @returns {Promise<Title>}
 */
const createTitle = async (titleBody) => {
  return Title.create(titleBody);
};

/**
 * Query for titles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTitles = async (filter, options) => {
  // eslint-disable-next-line no-return-await
  return await Title.paginate(filter, options);
};

/**
 * Get title by id
 * @param {ObjectId} id
 * @returns {Promise<Title>}
 */
const getTitleById = async (id) => {
  return Title.findById(id);
};

/**
 * Update title by id
 * @param {ObjectId} titleId
 * @param updateBody
 * @returns {Promise<Title>}
 */
const updateTitleById = async (titleId, updateBody) => {
  const updateTitle = await getTitleById(titleId);
  if (!updateTitle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Title not found');
  }
  Object.assign(updateTitle, updateBody);
  await updateTitle.save();
  return updateTitle;
};

/**
 * Delete title by id
 * @param {ObjectId} titleId
 * @returns {Promise<Title>}
 */
const deleteTitleById = async (titleId) => {
  const delTitle = await getTitleById(titleId);
  if (!delTitle) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Title not found');
  }
  await delTitle.remove();
  return delTitle;
};

module.exports = {
  createTitle,
  queryTitles,
  getTitleById,
  updateTitleById,
  deleteTitleById,
};
