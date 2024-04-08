const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { activityService } = require('../services');

const createActivity = catchAsync(async (req, res) => {
  req.body.actLongDescription = req.body.actLongDescription.replaceAll('&lt;', '<');
  const createAct = await activityService.createActivity(req.body);
  res.status(httpStatus.CREATED).send(createAct);
});

const getActivities = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await activityService.queryActivities(filter, options);
  res.set("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(result);
});

const getActivity = catchAsync(async (req, res) => {
  const getAct = await activityService.getActivityById(req.params.activityId);
  if (!getAct) {
    throw new ApiError(httpStatus.NOT_FOUND, "Activity not found");
  }
  res.send(getAct);
});

const updateActivity = catchAsync(async (req, res) => {
  const updateAct = await activityService.updateActivityById(req.params.activityId, req.body);
  res.send(updateAct);
});

const deleteActivity = catchAsync(async (req, res) => {
  const delAct = await activityService.deleteActivityById(req.params.activityId);
  if (!delAct) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Activity not found');
  }
  res.send(delAct);
});

module.exports = {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
};
