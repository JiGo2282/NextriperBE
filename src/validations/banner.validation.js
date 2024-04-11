const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBanner = {
  body: Joi.object().keys({
    bannerImg: Joi.string().required(),
    bannerType: Joi.string().required(),
  }),
};

const getBanners = {
  query: Joi.object().keys({
    bannerImg: Joi.string(),
    bannerType: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBanner = {
  params: Joi.object().keys({
    bannerId: Joi.string(),
  }),
};

const deleteBanner = {
  params: Joi.object().keys({
    bannerId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBanner,
  getBanners,
  getBanner,
  deleteBanner,
};
