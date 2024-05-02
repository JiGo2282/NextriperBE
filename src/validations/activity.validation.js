const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createActivity = {
  body: Joi.object().keys({
    actName: Joi.string().required(),
    actCountry: Joi.string().required(),
    actState: Joi.string().required(),
    actCity: Joi.string().required(),
    actDays: Joi.string().required(),
    actActualPrice: Joi.string().required(),
    actDiscountPrice: Joi.string().required(),
    actShortDescription: Joi.string().required(),
    actLongDescription: Joi.string().required(),
    actMainImg: Joi.string().required(),
    actSubImg1: Joi.string().required(),
    actSubImg2: Joi.string().required(),
    actSubImg3: Joi.string().required(),
    actType: Joi.string().required(),
  }),
};

const getActivities = {
  query: Joi.object().keys({
    actName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getActivity = {
  params: Joi.object().keys({
    // activityId: Joi.string().custom(objectId),
    activityId: Joi.string(),
  }),
};

const updateActivity = {
  params: Joi.object().keys({
    activityId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      actName: Joi.string().required(),
      actCountry: Joi.string().required(),
      actState: Joi.string().required(),
      actCity: Joi.string().required(),
      actDays: Joi.string().required(),
      actActualPrice: Joi.string().required(),
      actDiscountPrice: Joi.string().required(),
      actShortDescription: Joi.string().required(),
      actLongDescription: Joi.string().required(),
      actMainImg: Joi.string().required(),
      actSubImg1: Joi.string().required(),
      actSubImg2: Joi.string().required(),
      actSubImg3: Joi.string().required(),
      actType: Joi.string().required(),
    })
    .min(1),
};

const deleteActivity = {
  params: Joi.object().keys({
    activityId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createActivity,
  getActivities,
  getActivity,
  updateActivity,
  deleteActivity,
};
