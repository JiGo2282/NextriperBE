const httpStatus = require('http-status');
const { Entertainment } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a entertainment
 * @param {Object} entertainmentBody
 * @returns {Promise<Entertainment>}
 */
const createEntertainment = async (entertainmentBody) => {
  return Entertainment.create(entertainmentBody);
};

/**
 * Query for entertainments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEntertainments = async (filter, options) => {
  const entertainments = await Entertainment.paginate(filter, options);
  return entertainments;
};

/**
 * Get entertainment by id
 * @param {ObjectId} id
 * @returns {Promise<Entertainment>}
 */
const getEntertainmentById = async (id) => {
  return Entertainment.findById(id);
};

/**
 * Update entertainment by id
 * @param {ObjectId} entertainmentId
 * @param updateBody
 * @returns {Promise<Entertainment>}
 */
const updateEntertainmentById = async (entertainmentId, updateBody) => {
  const updateEntertainment = await getEntertainmentById(entertainmentId);
  if (!updateEntertainment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Entertainment not found');
  }
  Object.assign(updateEntertainment, updateBody);
  await updateEntertainment.save();
  return updateEntertainment;
};

/**
 * Delete entertainment by id
 * @param {ObjectId} entertainmentId
 * @returns {Promise<Entertainment>}
 */
const deleteEntertainmentById = async (entertainmentId) => {
  const delEntertainment = await getEntertainmentById(entertainmentId);
  if (!delEntertainment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Entertainment not found');
  }
  await delEntertainment.remove();
  return delEntertainment;
};

module.exports = {
  createEntertainment,
  queryEntertainments,
  getEntertainmentById,
  updateEntertainmentById,
  deleteEntertainmentById,
};
