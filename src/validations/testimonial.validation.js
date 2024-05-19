const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTestimonial = {
  body: Joi.object().keys({
    tName: Joi.string().required(),
    tFrom: Joi.string(),
    tMessage: Joi.string(),
    tImg: Joi.string(),
    tApproved: Joi.string(),
  }),
};

const getTestimonials = {
  query: Joi.object().keys({
    tName: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTestimonial = {
  params: Joi.object().keys({
    // testimonialId: Joi.string().custom(objectId),
    testimonialId: Joi.string(),
  }),
};

const updateTestimonial = {
  params: Joi.object().keys({
    testimonialId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      tName: Joi.string().required(),
      tFrom: Joi.string(),
      tMessage: Joi.string(),
      tImg: Joi.string(),
      tApproved: Joi.string(),
    })
    .min(1),
};

const deleteTestimonial = {
  params: Joi.object().keys({
    testimonialId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTestimonial,
  getTestimonials,
  getTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
