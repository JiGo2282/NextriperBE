const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEntertainment = {
  body: Joi.object().keys({
    packName: Joi.string().required(),
    packCountry: Joi.string().required(),
    packState: Joi.string().required(),
    packCity: Joi.string().required(),
    // packDays: Joi.string().required(),
    // packActualPrice: Joi.string().required(),
    // packDiscountPrice: Joi.string().required(),
    packShortDescription: Joi.string().required(),
    packLongDescription: Joi.string().required(),
    packMainImg: Joi.string().required(),
    packSubImg1: Joi.string().required(),
    packSubImg2: Joi.string().required(),
    packSubImg3: Joi.string().required(),
    packType: Joi.string().required(),
  }),
};

const getEntertainments = {
  query: Joi.object().keys({
    packName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getEntertainment = {
  params: Joi.object().keys({
    // entertainmentId: Joi.string().custom(objectId),
    entertainmentId: Joi.string(),
  }),
};

const updateEntertainment = {
  params: Joi.object().keys({
    entertainmentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      packName: Joi.string().required(),
      packCountry: Joi.string().required(),
      packState: Joi.string().required(),
      packCity: Joi.string().required(),
      packShortDescription: Joi.string().required(),
      packLongDescription: Joi.string().required(),
      packMainImg: Joi.string().required(),
      packSubImg1: Joi.string().required(),
      packSubImg2: Joi.string().required(),
      packSubImg3: Joi.string().required(),
      packType: Joi.string().required(),
    })
    .min(1),
};

const deleteEntertainment = {
  params: Joi.object().keys({
    entertainmentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEntertainment,
  getEntertainments,
  getEntertainment,
  updateEntertainment,
  deleteEntertainment,
};
