const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMenubar = {
  body: Joi.object().keys({
    label: Joi.string().required(),
  }),
};

const getMenubars = {
  query: Joi.object().keys({
    label: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMenubar = {
  params: Joi.object().keys({
    menubarId: Joi.string(),
  }),
};

const updateMenubar = {
  params: Joi.object().keys({
    menubarId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      label: Joi.string(),
    })
    .min(1),
};

const deleteMenubar = {
  params: Joi.object().keys({
    menubarId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMenubar,
  getMenubars,
  getMenubar,
  updateMenubar,
  deleteMenubar,
};
