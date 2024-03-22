const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPackage = {
  body: Joi.object().keys({
    packName: Joi.string().required(),
    packCountry: Joi.string().required(),
    packState: Joi.string().required(),
    packCity: Joi.string().required(),
    packDays: Joi.string().required(),
    packActualPrice: Joi.string().required(),
    packDiscountPrice: Joi.string().required(),
    packShortDescription: Joi.string().required(),
    packLongDescription: Joi.string().required(),
    packMainImg: Joi.string().required(),
    packSubImg1: Joi.string().required(),
    packSubImg2: Joi.string().required(),
    packSubImg3: Joi.string().required(),
    packType: Joi.string().required(),
  }),
};

const getPackages = {
  query: Joi.object().keys({
    packName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPackage = {
  params: Joi.object().keys({
    // packageId: Joi.string().custom(objectId),
    packageId: Joi.string(),
  }),
};

const updatePackage = {
  params: Joi.object().keys({
    packageId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      packageName: Joi.string(),
    })
    .min(1),
};

const deletePackage = {
  params: Joi.object().keys({
    packageId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPackage,
  getPackages,
  getPackage,
  updatePackage,
  deletePackage,
};
