const httpStatus = require('http-status');
const { Activity } = require('../models');
const ApiError = require('../utils/ApiError');
/**
 * Create a activity
 * @param {Object} activityBody
 * @returns {Promise<Activity>}
 */
const createActivity = async (activityBody) => {
  return Activity.create(activityBody);
};

/**
 * Query for activities
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryActivities = async (filter, options) => {
  const activities = await Activity.paginate(filter, options);
  return activities;
};

/**
 * Get activity by id
 * @param {ObjectId} id
 * @returns {Promise<Activity>}
 */
const getActivityById = async (id) => {
  return Activity.findById(id);
};

/**
 * Update activity by id
 * @param {ObjectId} activityId
 * @param updateBody
 * @returns {Promise<Activity>}
 */
const updateActivityById = async (activityId, updateBody) => {
  const updateActivity = await getActivityById(activityId);
  if (!updateActivity) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Activity not found');
  }
  Object.assign(updateActivity, updateBody);
  await updateActivity.save();
  return updateActivity;
};

/**
 * Delete activity by id
 * @param {ObjectId} activityId
 * @returns {Promise<Activity>}
 */
const deleteActivityById = async (activityId) => {
  const delAct = await getActivityById(activityId);
  if (!delAct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Activity not found');
  }
  await delAct.remove();
  return delAct;
};

module.exports = {
  createActivity,
  queryActivities,
  getActivityById,
  updateActivityById,
  deleteActivityById,
};
