const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTitle = {
  body: Joi.object().keys({
    tName: Joi.string().required(),
    tTitle: Joi.string(),
  }),
};

const getTitles = {
  query: Joi.object().keys({
    tName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTitle = {
  params: Joi.object().keys({
    titleId: Joi.string(),
  }),
};

const updateTitle = {
  params: Joi.object().keys({
    titleId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      tName: Joi.string().required(),
      tTitle: Joi.string(),
    })
    .min(1),
};

const deleteTitle = {
  params: Joi.object().keys({
    titleId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTitle,
  getTitles,
  getTitle,
  updateTitle,
  deleteTitle,
};
